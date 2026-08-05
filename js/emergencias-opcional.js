/* Opción específica para mostrar u ocultar el teléfono de emergencias en Caudete. */
(function configurarEmergenciasOpcionales() {
  const campoEmpresa = document.getElementById('campoEmpresa');
  const campoOficina = document.getElementById('campoOficina');
  if (!campoEmpresa || !campoOficina) return;

  const bloque = document.createElement('div');
  bloque.id = 'bloqueEmergenciasCaudete';
  bloque.className = 'opcion-universidad';
  bloque.style.display = 'none';
  bloque.innerHTML = '<label><input type="checkbox" id="campoMostrarEmergencias" checked> Mostrar teléfono de emergencias 24H</label>';

  const filaOficina = document.getElementById('filaOficina');
  filaOficina.insertAdjacentElement('afterend', bloque);

  const casilla = document.getElementById('campoMostrarEmergencias');

  function actualizarVisibilidadEmergencias() {
    const esCaudete = campoEmpresa.value === 'almantour' && campoOficina.value === 'caudete';
    bloque.style.display = esCaudete ? 'block' : 'none';
    if (!esCaudete) casilla.checked = true;
  }

  campoOficina.addEventListener('change', actualizarVisibilidadEmergencias);
  actualizarVisibilidadEmergencias();

  const recogerDatosOriginal = recogerDatosFormulario;
  recogerDatosFormulario = function recogerDatosConEmergencias() {
    const datos = recogerDatosOriginal();
    datos.mostrarUrgenciasReferencia = casilla.checked;
    return datos;
  };
})();
