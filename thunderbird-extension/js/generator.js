const estado = {
  identidades: [],
  firmaGenerada: ""
};

const identidadSelect = document.getElementById("campoIdentidad");
const empresaSelect = document.getElementById("campoEmpresa");
const oficinaSelect = document.getElementById("campoOficina");
const filaOficina = document.getElementById("filaOficina");
const cargoSelect = document.getElementById("campoCargo");
const cargoOtro = document.getElementById("campoCargoOtro");
const emailInput = document.getElementById("campoEmail");
const movilInput = document.getElementById("campoMovil");
const bloqueEmergenciasCaudete = document.getElementById("bloqueEmergenciasCaudete");
const mostrarEmergenciasInput = document.getElementById("campoMostrarEmergencias");

function mostrarEstado(texto, tipo = "exito") {
  const mensaje = document.getElementById("mensajeAccion");
  mensaje.textContent = texto;
  mensaje.className = tipo;
  mensaje.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function limpiarEstado() {
  const mensaje = document.getElementById("mensajeAccion");
  mensaje.textContent = "";
  mensaje.className = "";
}

function separarNombre(nombreCompleto) {
  const partes = String(nombreCompleto || "").trim().split(/\s+/).filter(Boolean);
  return {
    nombre: partes.shift() || "",
    apellidos: partes.join(" ")
  };
}

async function cargarIdentidades() {
  estado.identidades = await messenger.identities.list();
  estado.identidades = estado.identidades.filter((identidad) => identidad.email);

  if (!estado.identidades.length) {
    identidadSelect.innerHTML = '<option value="">No hay direcciones configuradas</option>';
    document.getElementById("btnGenerar").disabled = true;
    mostrarEstado("No se encontró ninguna cuenta de correo configurada en Thunderbird.", "error");
    return;
  }

  identidadSelect.innerHTML = estado.identidades
    .map((identidad) => `<option value="${escaparHtml(identidad.id)}">${escaparHtml(identidad.email)}${identidad.name ? ` — ${escaparHtml(identidad.name)}` : ""}</option>`)
    .join("");

  actualizarIdentidad();
}

function actualizarIdentidad() {
  const identidad = estado.identidades.find((item) => item.id === identidadSelect.value);
  if (!identidad) return;

  emailInput.value = identidad.email;
  const nombre = separarNombre(identidad.name);
  document.getElementById("campoNombre").value = nombre.nombre;
  document.getElementById("campoApellidos").value = nombre.apellidos;

  const email = identidad.email.trim().toLowerCase();
  const dominio = email.split("@")[1] || "";
  const empresas = Object.entries(CONFIG.empresas);
  const empresaPorCorreo = empresas.find(([, empresa]) =>
    email === String(empresa.emailPorDefecto || "").trim().toLowerCase()
  );
  const empresaPorDominio = empresas.find(([, empresa]) =>
    dominio === String(empresa.dominioEmail || "").trim().toLowerCase()
  );
  const empresaDetectada = empresaPorCorreo || empresaPorDominio;
  if (empresaDetectada) empresaSelect.value = empresaDetectada[0];
  actualizarEmpresa();
  estado.firmaGenerada = "";
  document.getElementById("resultado").style.display = "none";
  limpiarEstado();
}

function actualizarEmpresa() {
  const empresa = CONFIG.empresas[empresaSelect.value];
  const oficinas = Object.entries(empresa.oficinas);
  oficinaSelect.innerHTML = oficinas
    .map(([clave, oficina]) => `<option value="${clave}">${escaparHtml(oficina.etiqueta || empresa.nombreMostrado)}</option>`)
    .join("");
  filaOficina.style.display = empresa.tieneVariasOficinas ? "block" : "none";

  cargoSelect.innerHTML = `
    <option value="">Selecciona un cargo</option>
    ${(empresa.cargosComunes || []).map((cargo) => `<option value="${escaparHtml(cargo)}">${escaparHtml(cargo)}</option>`).join("")}
    <option value="__otro__">Otro cargo...</option>`;
  cargoOtro.value = "";
  cargoOtro.style.display = "none";
  actualizarControlesUniversidad(emailInput.value, empresaSelect.value);
  actualizarOpcionEmergencias();
}

function actualizarOpcionEmergencias() {
  const esCaudete = empresaSelect.value === "almantour" && oficinaSelect.value === "caudete";
  bloqueEmergenciasCaudete.style.display = esCaudete ? "block" : "none";
  if (!esCaudete) mostrarEmergenciasInput.checked = true;
}

function formatearMovil() {
  const digitos = movilInput.value.replace(/\D/g, "").slice(0, 9);
  const grupos = [digitos.slice(0, 3), digitos.slice(3, 5), digitos.slice(5, 7), digitos.slice(7, 9)].filter(Boolean);
  movilInput.value = grupos.join(" ");
}

function validar() {
  let valido = true;
  const requeridos = ["campoIdentidad", "campoNombre", "campoApellidos", "campoCargo", "campoEmail"];
  requeridos.forEach((id) => {
    const campo = document.getElementById(id);
    const correcto = Boolean(campo.value.trim());
    campo.classList.toggle("errorCampo", !correcto);
    if (!correcto) valido = false;
  });

  if (cargoSelect.value === "__otro__") {
    const correcto = Boolean(cargoOtro.value.trim());
    cargoOtro.classList.toggle("errorCampo", !correcto);
    if (!correcto) valido = false;
  }

  const movilCorrecto = !movilInput.value || telefonoSinEspacios(movilInput.value).length === 9;
  movilInput.classList.toggle("errorCampo", !movilCorrecto);
  if (!movilCorrecto) valido = false;

  if (!valido) mostrarEstado("Revisa los campos marcados. El móvil debe tener 9 cifras.", "error");
  return valido;
}

function recogerDatos() {
  const empresa = CONFIG.empresas[empresaSelect.value];
  const claveOficina = empresa.tieneVariasOficinas ? oficinaSelect.value : Object.keys(empresa.oficinas)[0];
  return {
    empresa,
    oficina: empresa.oficinas[claveOficina],
    nombreCompleto: `${document.getElementById("campoNombre").value} ${document.getElementById("campoApellidos").value}`.trim(),
    cargo: cargoSelect.value === "__otro__" ? cargoOtro.value.trim() : cargoSelect.value,
    email: emailInput.value.trim(),
    movil: movilInput.value.trim(),
    estilo: document.getElementById("campoEstilo").value,
    mostrarUrgenciasReferencia: mostrarEmergenciasInput.checked
  };
}

function generarFirma() {
  limpiarEstado();
  if (!validar()) return;
  const datos = recogerDatos();
  estado.firmaGenerada = envolverFirmaConSeparador(ESTILOS[datos.estilo].generar(datos).trim());
  document.getElementById("vistaPrevia").innerHTML = estado.firmaGenerada;
  document.getElementById("resultado").style.display = "block";
  document.getElementById("resultado").scrollIntoView({ behavior: "smooth" });
}

async function instalarFirma() {
  if (!estado.firmaGenerada) {
    mostrarEstado("Primero genera la vista previa de la firma.", "error");
    return;
  }

  const boton = document.getElementById("btnInstalar");
  boton.disabled = true;
  try {
    await messenger.identities.update(identidadSelect.value, {
      signature: `<div><br></div>${estado.firmaGenerada}`,
      signatureIsPlainText: false
    });
    mostrarEstado(`Firma guardada correctamente para ${emailInput.value}.`);
  } catch (error) {
    console.error(error);
    mostrarEstado("Thunderbird no pudo guardar la firma. Comprueba los permisos del complemento.", "error");
  } finally {
    boton.disabled = false;
  }
}

async function iniciarGenerador() {
  await CONFIG_READY;
  empresaSelect.innerHTML = Object.entries(CONFIG.empresas)
    .map(([clave, empresa]) => `<option value="${clave}">${escaparHtml(empresa.nombreMostrado)}</option>`)
    .join("");

  actualizarControlesUniversidad("", empresaSelect.value);

  identidadSelect.addEventListener("change", actualizarIdentidad);
  empresaSelect.addEventListener("change", actualizarEmpresa);
oficinaSelect.addEventListener("change", actualizarOpcionEmergencias);
  cargoSelect.addEventListener("change", () => {
    const esOtro = cargoSelect.value === "__otro__";
    cargoOtro.style.display = esOtro ? "block" : "none";
    if (esOtro) cargoOtro.focus();
  });
  movilInput.addEventListener("input", formatearMovil);
  document.getElementById("campoUniversidad").addEventListener("change", () => actualizarControlesUniversidad(emailInput.value, empresaSelect.value));
  document.getElementById("btnGenerar").addEventListener("click", generarFirma);
  document.getElementById("btnInstalar").addEventListener("click", instalarFirma);

  cargarIdentidades().catch((error) => {
    console.error(error);
    mostrarEstado("No se pudieron leer las cuentas de Thunderbird.", "error");
  });

}

iniciarGenerador().catch((error) => {
  console.error(error);
  mostrarEstado('No se pudo iniciar el generador.', 'error');
});
