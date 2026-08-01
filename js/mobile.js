(function prepararUsoMovil() {
  const aviso = document.getElementById('avisoEntorno');
  if (window.location.protocol === 'file:') {
    aviso.textContent = 'Para probar todas las funciones en el móvil, abre esta aplicación desde una dirección HTTPS. La vista previa local puede bloquear la copia al portapapeles.';
    aviso.style.display = 'block';
  }
  function ajustarVistaPreviaMovil() {
    const vista = document.getElementById('vistaPrevia');
    const firma = vista ? vista.querySelector('table') : null;
    if (!vista || !firma) return;
    firma.style.transform = '';
    firma.style.marginBottom = '';
    if (window.innerWidth <= 640) {
      const anchoDisponible = vista.clientWidth - 2;
      const anchoFirma = firma.scrollWidth || firma.offsetWidth;
      if (anchoFirma > anchoDisponible) {
        const escala = anchoDisponible / anchoFirma;
        firma.style.transform = 'scale(' + escala + ')';
        firma.style.marginBottom = -(firma.offsetHeight * (1 - escala)) + 'px';
      }
    }
  }
  document.getElementById('btnGenerar').addEventListener('click', function () {
    window.setTimeout(ajustarVistaPreviaMovil, 0);
  });
  window.addEventListener('resize', ajustarVistaPreviaMovil);
})();
