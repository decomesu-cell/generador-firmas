const VERSION_RECURSOS = '20260806-24';

async function cargarScript(ruta) {
  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${ruta}?v=${VERSION_RECURSOS}`;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`No se pudo cargar ${ruta}`));
    document.body.appendChild(script);
  });
}

async function iniciarAplicacionWeb() {
  await CONFIG_READY;
  const scripts = [
    'js/form.js',
    'js/utils.js',
    'js/validation.js',
    'js/emergencias-opcional.js',
    'js/templates/combinada.js',
    'js/templates/minimalista.js',
    'js/templates/universidad.js',
    'js/templates/registro.js',
    'js/app.js',
    'js/exporters.js',
    'js/mobile.js'
  ];

  for (const ruta of scripts) await cargarScript(ruta);
}

iniciarAplicacionWeb().catch((error) => {
  console.error(error);
  const aviso = document.getElementById('avisoEntorno');
  aviso.textContent = 'No se pudo iniciar el generador. Recarga la página o avisa al administrador.';
  aviso.style.display = 'block';
});
