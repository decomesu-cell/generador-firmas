// -------- ACCIONES DE SALIDA --------
document.getElementById('btnCopiar').addEventListener('click', async () => {
  const vista = document.getElementById('vistaPrevia');
  const htmlBlob = new Blob([vista.innerHTML], { type: 'text/html' });
  const textBlob = new Blob([vista.innerText], { type: 'text/plain' });
  try {
    await navigator.clipboard.write([
      new ClipboardItem({ 'text/html': htmlBlob, 'text/plain': textBlob })
    ]);
    mostrarMensaje('✔ Firma copiada con formato.');
  } catch (err) {
    mostrarMensaje('No se pudo copiar automáticamente. Selecciona la firma y usa Ctrl+C.', true);
  }
});

document.getElementById('btnCopiarHtml').addEventListener('click', async () => {
  const html = document.getElementById('vistaPrevia').innerHTML.trim();
  try {
    await navigator.clipboard.writeText(html);
    mostrarMensaje('✔ Código HTML copiado como texto.');
  } catch (err) {
    mostrarMensaje('No se pudo copiar el código HTML.', true);
  }
});

document.getElementById('btnDescargarHtml').addEventListener('click', () => {
  const datos = recogerDatosFormulario();
  const firma = document.getElementById('vistaPrevia').innerHTML.trim();
  const documento = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Firma de ${escaparHtml(datos.nombreCompleto)}</title>
</head>
<body>${firma}</body>
</html>`;
  const nombreArchivo = `Firma - ${datos.nombreCompleto || 'Sin nombre'} - ${datos.empresa.nombreMostrado}`
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') + '.html';
  const blob = new Blob([documento], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = nombreArchivo;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  URL.revokeObjectURL(url);
  mostrarMensaje('✔ Archivo HTML descargado para usarlo en Thunderbird.');
});
