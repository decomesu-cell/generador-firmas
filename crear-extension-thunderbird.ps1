param(
  [switch]$NoPause
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$extensionRoot = Join-Path $projectRoot "thunderbird-extension"
$utf8 = [Text.UTF8Encoding]::new($false)

function Copy-SharedFile {
  param(
    [Parameter(Mandatory)] [string]$Source,
    [Parameter(Mandatory)] [string]$Destination
  )

  $destinationDirectory = Split-Path -Parent $Destination
  New-Item -ItemType Directory -Force -Path $destinationDirectory | Out-Null
  Copy-Item -LiteralPath $Source -Destination $Destination -Force
}

try {
  Write-Host "Actualizando los archivos compartidos..." -ForegroundColor Cyan

  Copy-SharedFile (Join-Path $projectRoot "css\app.css") (Join-Path $extensionRoot "css\app.css")
  Copy-SharedFile (Join-Path $projectRoot "js\config.js") (Join-Path $extensionRoot "js\config.js")
  Copy-SharedFile (Join-Path $projectRoot "js\utils.js") (Join-Path $extensionRoot "js\utils.js")

  $templatesSource = Join-Path $projectRoot "js\templates"
  $templatesDestination = Join-Path $extensionRoot "js\templates"
  New-Item -ItemType Directory -Force -Path $templatesDestination | Out-Null

  Get-ChildItem -LiteralPath $templatesDestination -Filter "*.js" -File |
    Remove-Item -Force

  Get-ChildItem -LiteralPath $templatesSource -Filter "*.js" -File |
    ForEach-Object {
      Copy-SharedFile $_.FullName (Join-Path $templatesDestination $_.Name)
    }

  $manifestPath = Join-Path $extensionRoot "manifest.json"
  $manifest = Get-Content -LiteralPath $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
  $version = $manifest.version

  $generatorPath = Join-Path $extensionRoot "generator.html"
  $generatorHtml = [IO.File]::ReadAllText($generatorPath, [Text.Encoding]::UTF8)
  $templateScripts = Get-ChildItem -LiteralPath $templatesDestination -Filter "*.js" -File |
    Where-Object Name -ne "registro.js" |
    Sort-Object Name |
    ForEach-Object { "  <script src=`"js/templates/$($_.Name)`"></script>" }
  $templateScripts += '  <script src="js/templates/registro.js"></script>'

  $replacement = ($templateScripts -join "`r`n")
  $generatorHtml = [regex]::Replace(
    $generatorHtml,
    '(?ms)^\s*<script src="js/templates/.*?</script>\s*(?=<script src="js/generator.js"></script>)',
    $replacement + "`r`n  "
  )
  [IO.File]::WriteAllText($generatorPath, $generatorHtml, $utf8)

  Write-Host "Comprobando JavaScript..." -ForegroundColor Cyan
  $node = Get-Command node -ErrorAction SilentlyContinue
  if ($node) {
    Get-ChildItem -LiteralPath $extensionRoot -Recurse -Filter "*.js" -File |
      ForEach-Object {
        & $node.Source --check $_.FullName
        if ($LASTEXITCODE -ne 0) { throw "Error de JavaScript en $($_.Name)." }
      }
  } else {
    Write-Host "No se encontró Node.js; se omite la comprobación avanzada." -ForegroundColor Yellow
  }

  $xpiPath = Join-Path $projectRoot "generador-firmas-thunderbird-$version.xpi"
  if (Test-Path -LiteralPath $xpiPath) { Remove-Item -LiteralPath $xpiPath -Force }

  Write-Host "Creando el archivo instalable..." -ForegroundColor Cyan
  Add-Type -AssemblyName System.IO.Compression
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  $xpiStream = [IO.File]::Open($xpiPath, [IO.FileMode]::CreateNew)
  $xpiArchive = [IO.Compression.ZipArchive]::new(
    $xpiStream,
    [IO.Compression.ZipArchiveMode]::Create
  )
  try {
    Get-ChildItem -LiteralPath $extensionRoot -Recurse -File | ForEach-Object {
      $entryName = $_.FullName.Substring($extensionRoot.Length + 1).Replace('\', '/')
      [IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
        $xpiArchive,
        $_.FullName,
        $entryName,
        [IO.Compression.CompressionLevel]::Optimal
      ) | Out-Null
    }
  } finally {
    $xpiArchive.Dispose()
    $xpiStream.Dispose()
  }

  $archive = [IO.Compression.ZipFile]::OpenRead($xpiPath)
  try {
    if (-not ($archive.Entries | Where-Object FullName -eq "manifest.json")) {
      throw "El paquete no contiene manifest.json en la raíz."
    }
    $invalidPaths = $archive.Entries | Where-Object FullName -Match '\\'
    if ($invalidPaths) {
      throw "El paquete contiene rutas incompatibles con Thunderbird."
    }
  } finally {
    $archive.Dispose()
  }

  Write-Host "" 
  Write-Host "Extensión creada correctamente:" -ForegroundColor Green
  Write-Host $xpiPath -ForegroundColor Green
} catch {
  Write-Host "" 
  Write-Host "No se pudo crear la extensión:" -ForegroundColor Red
  Write-Host $_.Exception.Message -ForegroundColor Red
  if (-not $NoPause) { Read-Host "Pulsa Intro para cerrar" }
  exit 1
}

if (-not $NoPause) { Read-Host "Pulsa Intro para cerrar" }
