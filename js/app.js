// Rellena el desplegable de estilos a partir del registro de arriba
// (solo si ya estamos en modo formulario, es decir, si la empresa
// ya está decidida — en la pantalla de selección este campo no existe)
if (claveEmpresaFija) {
  const campoEmail = document.getElementById('campoEmail');
  const campoUniversidad = document.getElementById('campoUniversidad');
  actualizarControlesUniversidad(campoEmail.value);
  campoEmail.addEventListener('input', () => actualizarControlesUniversidad(campoEmail.value));
  campoUniversidad.addEventListener('change', () => actualizarControlesUniversidad(campoEmail.value));
}

// -------- BOTÓN GENERAR --------
document.getElementById('btnGenerar').addEventListener('click', () => {
  if (!validarFormulario()) return;
  const datos = recogerDatosFormulario();
  const html = envolverFirmaConSeparador(ESTILOS[datos.estilo].generar(datos));
  const vista = document.getElementById('vistaPrevia');
  vista.innerHTML = html;
  document.getElementById('resultado').style.display = 'block';
  document.getElementById('resultado').scrollIntoView({ behavior: 'smooth' });
});
