/* ============================================================
   PARTE 2 — CONSTRUCCIÓN DEL FORMULARIO
   Genera automáticamente los campos del formulario según las
   empresas y oficinas definidas en CONFIG (Parte 1).
   No necesitas tocar nada aquí al añadir una empresa nueva.
   ============================================================ */

const contenedorFormulario = document.getElementById('formulario');

// Construye las <option> del selector de empresa
function opcionesEmpresas() {
  return Object.entries(CONFIG.empresas)
    .map(([clave, empresa]) => `<option value="${clave}">${empresa.nombreMostrado}</option>`)
    .join('');
}

// Construye las <option> del selector de oficina para una empresa dada
function opcionesOficinas(claveEmpresa) {
  const empresa = CONFIG.empresas[claveEmpresa];
  return Object.entries(empresa.oficinas)
    .map(([clave, oficina]) => `<option value="${clave}">${oficina.etiqueta || empresa.nombreMostrado}</option>`)
    .join('');
}

// Lee "?empresa=almantour" de la URL. Si el enlace que se le da a
// cada empleado incluye este parámetro, el formulario queda BLOQUEADO
// a esa empresa (sin desplegable, sin poder elegir otra).
// Si no hay parámetro (por ejemplo, al probar el archivo tú mismo),
// se muestra el desplegable normal con todas las empresas.
function empresaFijadaPorURL() {
  const parametros = new URLSearchParams(window.location.search);
  const clave = parametros.get('empresa');
  return (clave && CONFIG.empresas[clave]) ? clave : null;
}

const claveEmpresaFija = empresaFijadaPorURL();

// Pantalla inicial: botones grandes para elegir empresa (se usa cuando
// el enlace NO trae "?empresa=..." todavía, por ejemplo la primera vez
// que alguien entra al enlace genérico)
function pantallaSeleccionEmpresa() {
  const botones = Object.entries(CONFIG.empresas).map(([clave, empresa]) => `
    <button type="button" class="botonEmpresa" data-clave="${clave}"
      style="display:block; width:100%; padding:16px; margin-bottom:10px; border:1px solid #ddd;
             border-radius:8px; background:#fff; font-size:15px; font-weight:bold; cursor:pointer; text-align:left;">
      ${empresa.nombreMostrado}
    </button>`).join('');
  return `<p style="color:#555; font-size:14px; margin-top:0;">¿Para qué empresa quieres generar tu firma?</p>${botones}`;
}

if (!claveEmpresaFija) {
  // --- MODO SELECCIÓN: aún no sabemos la empresa, mostramos los botones ---
  contenedorFormulario.innerHTML = pantallaSeleccionEmpresa();
  document.getElementById('btnGenerar').style.display = 'none';
  contenedorFormulario.querySelectorAll('.botonEmpresa').forEach(boton => {
    boton.addEventListener('click', () => {
      // Recargamos la página con "?empresa=..." en la URL: a partir de
      // ahí entra en el otro caso (MODO FORMULARIO) ya bloqueada a esa empresa.
      window.location.search = `?empresa=${boton.getAttribute('data-clave')}`;
    });
  });

} else {
  // --- MODO FORMULARIO: la empresa ya está decidida, construimos todo lo demás ---
  contenedorFormulario.innerHTML = `
    <label>Empresa</label>
    <input type="hidden" id="campoEmpresa" value="${claveEmpresaFija}">
    <div style="padding:9px 10px; background:#f0f0f0; border-radius:6px; font-size:14px; color:#555;">
      ${CONFIG.empresas[claveEmpresaFija].nombreMostrado}
      <a href="${window.location.pathname}" style="float:right; font-size:12px; color:#888;">(cambiar)</a>
    </div>

    <div id="filaOficina" style="display:none;">
      <label>Oficina</label>
      <select id="campoOficina"></select>
    </div>

    <div class="fila-dos">
      <div>
        <label>Nombre</label>
        <input type="text" id="campoNombre" placeholder="Nombre">
      </div>
      <div>
        <label>Apellidos</label>
        <input type="text" id="campoApellidos" placeholder="Apellidos">
      </div>
    </div>

    <label>Cargo</label>
    <select id="campoCargo"></select>
    <input type="text" id="campoCargoOtro" placeholder="Escribe tu cargo" style="display:none; margin-top:8px;">

    <label>Email</label>
    <input type="email" id="campoEmail" autocomplete="email">

    <label>Móvil <span class="opcional">(opcional, 9 cifras)</span></label>
    <input type="text" id="campoMovil" placeholder="600 00 00 00" inputmode="numeric" autocomplete="tel" maxlength="12" pattern="[0-9]{3} [0-9]{2} [0-9]{2} [0-9]{2}">

    <label>Estilo de firma</label>
    <select id="campoEstilo"></select>
  `;

  const campoEmpresa = document.getElementById('campoEmpresa');
  const filaOficina = document.getElementById('filaOficina');
  const campoOficina = document.getElementById('campoOficina');

  // Muestra/oculta el selector de oficina según si la empresa elegida tiene varias
  function actualizarOficinas() {
    const empresa = CONFIG.empresas[campoEmpresa.value];
    if (empresa.tieneVariasOficinas) {
      filaOficina.style.display = 'block';
      campoOficina.innerHTML = opcionesOficinas(campoEmpresa.value);
    } else {
      filaOficina.style.display = 'none';
    }
  }

  // Rellena el selector de cargo. En móvil, un <select> funciona
  // mejor que un <datalist>. La opción "Otro cargo" permite escribir uno distinto.
  function actualizarCargosSugeridos() {
    const empresa = CONFIG.empresas[campoEmpresa.value];
    const campoCargo = document.getElementById('campoCargo');
    campoCargo.innerHTML = `
      <option value="">Selecciona un cargo</option>
      ${(empresa.cargosComunes || []).map(c => `<option value="${c}">${c}</option>`).join('')}
      <option value="__otro__">Otro cargo...</option>
    `;
  }

  document.getElementById('campoCargo').addEventListener('change', (e) => {
    const campoOtro = document.getElementById('campoCargoOtro');
    const esOtro = e.target.value === '__otro__';
    campoOtro.style.display = esOtro ? 'block' : 'none';
    if (!esOtro) campoOtro.value = '';
    if (esOtro) campoOtro.focus();
  });

  // Autocompleta el dominio del email en cuanto el usuario escribe "@".
  // Ejemplo: el empleado escribe "ana@" y el campo pasa a "ana@almantour.com"
  // automáticamente. Así cada uno escribe su email tal cual lo conoce
  // (no todos siguen el patrón nombre.apellido), y el dominio —que es
  // fijo por empresa y el que más errores de escritura suele tener— no
  // hay que teclearlo.
  const campoEmail = document.getElementById('campoEmail');
  const empresaActual = CONFIG.empresas[campoEmpresa.value];
  campoEmail.value = empresaActual.emailPorDefecto || '';
  campoEmail.placeholder = empresaActual.emailPorDefecto
    ? 'Correo común de la empresa'
    : 'Escribe tu email; el dominio se completa solo al poner @';

  document.addEventListener('input', (e) => {
    if (e.target.id === 'campoEmail') {
      const empresa = CONFIG.empresas[campoEmpresa.value];
      if (empresa.autocompletarDominio && e.target.value.endsWith('@')) {
        e.target.value += empresa.dominioEmail;
      }
    }
  });

  // El móvil admite exclusivamente 9 cifras y las muestra siempre como 600 00 00 00.
  const campoMovil = document.getElementById('campoMovil');
  campoMovil.addEventListener('input', () => {
    const digitos = campoMovil.value.replace(/\D/g, '').slice(0, 9);
    const grupos = [];
    if (digitos.length) grupos.push(digitos.slice(0, 3));
    if (digitos.length > 3) grupos.push(digitos.slice(3, 5));
    if (digitos.length > 5) grupos.push(digitos.slice(5, 7));
    if (digitos.length > 7) grupos.push(digitos.slice(7, 9));
    campoMovil.value = grupos.join(' ');
    campoMovil.classList.remove('errorCampo');
  });

  campoMovil.addEventListener('keydown', (e) => {
    const permitidas = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
    if (!/^[0-9]$/.test(e.key) && !permitidas.includes(e.key) && !(e.ctrlKey || e.metaKey)) {
      e.preventDefault();
    }
  });

  actualizarOficinas();        // estado inicial al cargar la página
  actualizarCargosSugeridos(); // idem
}
