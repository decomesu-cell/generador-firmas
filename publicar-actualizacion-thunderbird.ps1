param(
  [string]$Version,
  [switch]$NoPause
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$manifestPath = Join-Path $projectRoot "thunderbird-extension\manifest.json"
$updatesRoot = Join-Path $projectRoot "actualizaciones-thunderbird"
$builderPath = Join-Path $projectRoot "crear-extension-thunderbird.ps1"
$utf8 = [Text.UTF8Encoding]::new($false)
$addonId = "generador-firmas@almantour.es"
$publicBaseUrl = "https://decomesu-cell.github.io/generador-firmas/actualizaciones-thunderbird"
$updateManifestUrl = "$publicBaseUrl/updates.json"

function Get-NextVersion {
  param([Parameter(Mandatory)] [string]$CurrentVersion)
  $parts = $CurrentVersion.Split('.')
  if ($parts.Count -lt 2 -or $parts.Count -gt 4 -or ($parts | Where-Object { $_ -notmatch '^\d+$' })) {
    throw "La versión actual '$CurrentVersion' no es válida."
  }
  while ($parts.Count -lt 3) { $parts += '0' }
  $parts[$parts.Count - 1] = ([int]$parts[$parts.Count - 1] + 1).ToString()
  return ($parts -join '.')
}

try {
  $manifest = Get-Content -LiteralPath $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
  $currentVersion = [string]$manifest.version
  $nextVersion = if ($Version) { $Version } else { Get-NextVersion $currentVersion }

  if ($nextVersion -notmatch '^(0|[1-9]\d{0,8})(\.(0|[1-9]\d{0,8})){1,3}$') {
    throw "La versión '$nextVersion' no es válida. Usa un formato como 2.2.1."
  }
  if ([version]$nextVersion -le [version]$currentVersion -and -not $Version) {
    throw "La nueva versión debe ser superior a $currentVersion."
  }

  Write-Host "Preparando Thunderbird $nextVersion..." -ForegroundColor Cyan
  $manifest.version = $nextVersion
  if (-not $manifest.browser_specific_settings.gecko.PSObject.Properties['update_url']) {
    $manifest.browser_specific_settings.gecko | Add-Member -NotePropertyName update_url -NotePropertyValue $updateManifestUrl
  } else {
    $manifest.browser_specific_settings.gecko.update_url = $updateManifestUrl
  }
  [IO.File]::WriteAllText($manifestPath, ($manifest | ConvertTo-Json -Depth 20) + "`r`n", $utf8)

  & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $builderPath -NoPause
  if ($LASTEXITCODE -ne 0) { throw "Falló la creación del complemento." }

  $xpiName = "generador-firmas-thunderbird-$nextVersion.xpi"
  $xpiPath = Join-Path $projectRoot $xpiName
  if (-not (Test-Path -LiteralPath $xpiPath)) { throw "No se encontró $xpiName." }

  New-Item -ItemType Directory -Force -Path $updatesRoot | Out-Null
  $publishedXpiPath = Join-Path $updatesRoot $xpiName
  Copy-Item -LiteralPath $xpiPath -Destination $publishedXpiPath -Force
  $hash = (Get-FileHash -LiteralPath $publishedXpiPath -Algorithm SHA256).Hash.ToLowerInvariant()

  $updateData = [ordered]@{
    addons = [ordered]@{
      $addonId = [ordered]@{
        updates = @(
          [ordered]@{
            version = $nextVersion
            update_link = "$publicBaseUrl/$xpiName"
            update_hash = "sha256:$hash"
            applications = [ordered]@{
              gecko = [ordered]@{ strict_min_version = "128.0" }
            }
          }
        )
      }
    }
  }
  $updatesPath = Join-Path $updatesRoot "updates.json"
  [IO.File]::WriteAllText($updatesPath, ($updateData | ConvertTo-Json -Depth 20) + "`r`n", $utf8)

  $releaseInfo = [ordered]@{
    version = $nextVersion
    file = $xpiName
    sha256 = $hash
    generated_at = (Get-Date).ToString('yyyy-MM-ddTHH:mm:ssK')
  }
  [IO.File]::WriteAllText((Join-Path $updatesRoot 'ultima-version.json'), ($releaseInfo | ConvertTo-Json -Depth 10) + "`r`n", $utf8)

  Write-Host ""
  Write-Host "Actualización preparada correctamente." -ForegroundColor Green
  Write-Host "Versión: $nextVersion" -ForegroundColor Green
  Write-Host "XPI: $publishedXpiPath" -ForegroundColor Green
  Write-Host "Manifiesto: $updatesPath" -ForegroundColor Green
  Write-Host ""
  Write-Host "Ahora publica los cambios con GitHub Desktop." -ForegroundColor Yellow
} catch {
  Write-Host ""
  Write-Host "No se pudo preparar la actualización:" -ForegroundColor Red
  Write-Host $_.Exception.Message -ForegroundColor Red
  if (-not $NoPause) { Read-Host "Pulsa Intro para cerrar" }
  exit 1
}

if (-not $NoPause) { Read-Host "Pulsa Intro para cerrar" }