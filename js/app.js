// Rellena el desplegable de estilos a partir del registro de arriba
// (solo si ya estamos en modo formulario, es decir, si la empresa
// ya está decidida — en la pantalla de selección este campo no existe)
if (claveEmpresaFija) {
  document.getElementById('campoEstilo').innerHTML = Object.entries(ESTILOS)
    .map(([clave, estilo]) => `<option value="${clave}">${estilo.etiqueta}</option>`)
    .join('');
}

// -------- BOTÓN GENERAR --------
document.getElementById('btnGenerar').addEventListener('click', () => {
  if (!validarFormulario()) return;
  const datos = recogerDatosFormulario();
  const html = ESTILOS[datos.estilo].generar(datos);
  const vista = document.getElementById('vistaPrevia');
  vista.innerHTML = html;
  document.getElementById('resultado').style.display = 'block';
  document.getElementById('resultado').scrollIntoView({ behavior: 'smooth' });
});
