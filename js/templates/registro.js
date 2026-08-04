/* Registro central de diseños de firma. */
const ESTILOS = {
  combinada:   { etiqueta: "Combinada (logo + línea de color)", generar: generarFirmaCombinada },
  minimalista: { etiqueta: "Minimalista", generar: generarFirmaMinimalista },
  universidad_apagada: {
    etiqueta: "Universidad · tonos apagados",
    generar: generarFirmaUniversidadApagada,
    grupoUniversidad: "universidad"
  },
  universidad_corporativa: {
    etiqueta: "Universidad · colores corporativos",
    generar: generarFirmaUniversidadCorporativa,
    grupoUniversidad: "universidad"
  }
};

function grupoUniversidadParaEmail(email) {
  const correo = String(email || '').trim().toLowerCase();
  const coincidencia = Object.entries(CONFIG.universidades || {}).find(([, universidad]) =>
    (universidad.correos || []).map((item) => String(item).toLowerCase()).includes(correo)
  );
  return coincidencia ? coincidencia[0] : '';
}

function estilosDisponibles(email, usarUniversidad) {
  const grupo = grupoUniversidadParaEmail(email);
  const universidad = (CONFIG.universidades || {})[grupo];
  const disenosPermitidos = universidad ? universidad.disenos || [] : [];
  return Object.entries(ESTILOS).filter(([clave, estilo]) => {
    if (usarUniversidad) return disenosPermitidos.includes(clave);
    return !estilo.grupoUniversidad;
  });
}

function actualizarControlesUniversidad(email) {
  const casilla = document.getElementById('campoUniversidad');
  const bloque = document.getElementById('bloqueUniversidad');
  const selector = document.getElementById('campoEstilo');
  if (!casilla || !selector) return;

  const hayDisenos = Boolean(grupoUniversidadParaEmail(email));
  bloque.style.display = hayDisenos ? 'block' : 'none';
  if (!hayDisenos) casilla.checked = false;

  const disponibles = estilosDisponibles(email, casilla.checked);
  selector.innerHTML = disponibles
    .map(([clave, estilo]) => `<option value="${clave}">${estilo.etiqueta}</option>`)
    .join('');
}