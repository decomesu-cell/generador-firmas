/* Registro central de diseños de firma. */
const ESTILOS = {
  combinada:   { etiqueta: "Combinada (logo + línea de color)", generar: generarFirmaCombinada },
  minimalista: { etiqueta: "Minimalista", generar: generarFirmaMinimalista },
  universidad_apagada: {
    etiqueta: "Universidad · tonos apagados",
    generar: generarFirmaUniversidadApagada,
    universidadGeneral: true
  },
  universidad_corporativa: {
    etiqueta: "Universidad · colores corporativos",
    generar: generarFirmaUniversidadCorporativa,
    universidadGeneral: true
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
  const universidadDetectada = grupoUniversidadParaEmail(email);
  return Object.entries(ESTILOS).filter(([, estilo]) => {
    if (!estilo.universidadGeneral && !estilo.universidadEspecifica) return true;
    if (!usarUniversidad) return false;
    if (estilo.universidadGeneral) return true;
    return estilo.universidadEspecifica === universidadDetectada;
  });
}

function actualizarControlesUniversidad(email) {
  const casilla = document.getElementById('campoUniversidad');
  const bloque = document.getElementById('bloqueUniversidad');
  const selector = document.getElementById('campoEstilo');
  if (!casilla || !selector) return;

  bloque.style.display = 'block';

  const disponibles = estilosDisponibles(email, casilla.checked);
  selector.innerHTML = disponibles
    .map(([clave, estilo]) => `<option value="${clave}">${estilo.etiqueta}</option>`)
    .join('');
}