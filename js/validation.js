function validarFormulario() {
  const requeridos = ['campoNombre', 'campoApellidos', 'campoEmail'];
  let valido = true;
  requeridos.forEach(id => {
    const campo = document.getElementById(id);
    campo.classList.toggle('errorCampo', !campo.value.trim());
    if (!campo.value.trim()) valido = false;
  });

  const campoCargo = document.getElementById('campoCargo');
  const campoCargoOtro = document.getElementById('campoCargoOtro');
  const cargoValido = campoCargo.value && (campoCargo.value !== '__otro__' || campoCargoOtro.value.trim());
  campoCargo.classList.toggle('errorCampo', !cargoValido);
  campoCargoOtro.classList.toggle('errorCampo', campoCargo.value === '__otro__' && !campoCargoOtro.value.trim());
  if (!cargoValido) valido = false;

  const email = document.getElementById('campoEmail');
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  email.classList.toggle('errorCampo', !emailValido);
  if (!emailValido) valido = false;

  const movil = document.getElementById('campoMovil');
  const cifrasMovil = telefonoSinEspacios(movil.value);
  const movilValido = !cifrasMovil || cifrasMovil.length === 9;
  movil.classList.toggle('errorCampo', !movilValido);
  if (!movilValido) valido = false;

  if (!valido) mostrarMensaje('Revisa los campos marcados. El móvil debe tener exactamente 9 cifras.', true);
  return valido;
}

// Recoge todos los datos del formulario en un único objeto.
// Busca los campos directamente por id (con document.getElementById)
// en vez de depender de variables de la Parte 2, para que esta parte
// funcione con independencia de cómo se haya construido el formulario.
function recogerDatosFormulario() {
  const claveEmpresa = document.getElementById('campoEmpresa').value;
  const empresa = CONFIG.empresas[claveEmpresa];
  const elementoOficina = document.getElementById('campoOficina');
  const claveOficina = empresa.tieneVariasOficinas ? elementoOficina.value : Object.keys(empresa.oficinas)[0];
  const oficina = empresa.oficinas[claveOficina];

  return {
    empresa,
    oficina,
    nombreCompleto: `${document.getElementById('campoNombre').value} ${document.getElementById('campoApellidos').value}`.trim(),
    cargo: document.getElementById('campoCargo').value === '__otro__'
      ? document.getElementById('campoCargoOtro').value.trim()
      : document.getElementById('campoCargo').value.trim(),
    email: document.getElementById('campoEmail').value.trim(),
    movil: document.getElementById('campoMovil').value.trim(),
    estilo: document.getElementById('campoEstilo').value
  };
}
