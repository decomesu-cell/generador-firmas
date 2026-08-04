/* ============================================================
   PARTE 3 — GENERACIÓN DE LA FIRMA
   Aquí se construye el HTML final de la firma (con tablas,
   compatible con Outlook/Gmail/Apple Mail), usando los datos
   del formulario + la configuración de la empresa elegida.
   ============================================================ */

// Icono real (imagen) para WhatsApp / 24h / redes sociales
function iconoImagen(ruta, alt, tam) {
  return `<img src="${urlImagen(ruta)}" alt="${alt}" width="${tam}" height="${tam}" style="display:inline-block; vertical-align:middle; border:0;">`;
}

// Bloque de "urgencias 24h" con icono de WhatsApp + insignia 24H
function bloqueUrgencias(telefono, compacto) {
  const tamIcono = 14;
  return `${telefono} ${iconoImagen('assets/iconos/icono-whatsapp.png','WhatsApp',tamIcono)} ${iconoImagen('assets/iconos/icono-24h.png','Urgencias 24h',tamIcono)}`;
}

// Fila de iconos de redes sociales (solo las que la empresa tenga configuradas)
function filaRedesSociales(redes, mostrarRedes = {}, tam = 18) {
  const iconosPorClave = {
    facebook: 'assets/iconos/icono-facebook.png',
    instagram: 'assets/iconos/icono-instagram.png',
    linkedin: 'assets/iconos/icono-linkedin.png',
    whatsapp: 'assets/iconos/icono-whatsapp_gris.png'
  };
  return Object.entries(redes).map(([clave, url]) => {
    const ruta = iconosPorClave[clave];
    if (!ruta || !url || mostrarRedes[clave] === false) return '';
    return `<a href="${url}" style="text-decoration:none; padding-right:6px;">${iconoImagen(ruta, clave, tam)}</a>`;
  }).join('');
}

function telefonoSinEspacios(telefono) {
  return String(telefono || '').replace(/\D/g, '');
}

function enlaceTelefono(telefono, contenido) {
  return `<a href="tel:+34${telefonoSinEspacios(telefono)}" style="color:#333333; text-decoration:none;">${contenido || telefono}</a>`;
}

function enlaceDireccion(direccion) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
  return `<a href="${url}" style="color:#333333; text-decoration:none;">${direccion}</a>`;
}

function escaparHtml(texto) {
  return String(texto || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function mostrarMensaje(texto, esError = false) {
  const msg = document.getElementById('mensajeAccion');
  msg.textContent = texto;
  msg.style.color = esError ? '#c62828' : '#0a7d3c';
  msg.style.display = 'block';
  clearTimeout(mostrarMensaje.temporizador);
  mostrarMensaje.temporizador = setTimeout(() => { msg.style.display = 'none'; }, 5000);
}
