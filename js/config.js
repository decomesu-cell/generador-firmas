/* ============================================================
   PARTE 1 — CONFIGURACIÓN
   Aquí vive TODA la información de cada empresa: logos, colores,
   oficinas, teléfonos, webs, redes sociales...
   Todo lo marcado con "SUSTITUYE" es un dato de ejemplo (falso)
   que debes cambiar por el dato real de tu empresa.
   ============================================================ */

const CONFIG_LOCAL = {

  // Tu usuario de GitHub. Con esto se construyen las URLs de las
  // imágenes (logos e iconos) que subiste en la Fase 2.
  githubUser: "decomesu-cell",     // <-- SUSTITUYE por tu usuario real de GitHub
  repoName: "generador-firmas",         // nombre del repositorio (déjalo si no lo cambiaste)

  empresas: {

    // ---------------------- ALMANTOUR ----------------------
    almantour: {
      nombreMostrado: "Almantour",
      colorAcento: "#E8590C",
      logoCuadrado: "assets/almantour/logo-cuadrado.png",
      logoHorizontal: "assets/almantour/logo-horizontal.png",
      logoUniversidades: "assets/almantour/logo-universidades.png",
      isotipoUniversidades: "assets/almantour/isotipo-universidades.png",
      logoUniversidadesCorporativo: "assets/almantour/logotipo_almantour.png",
      isotipoUniversidadesCorporativo: "assets/almantour/isotipo_almantour.png",
      web: "www.almantour.es",             // <-- SUSTITUYE por la web real (si es distinta)
      dominioEmail: "almantour.com",        // dominio usado para autocompletar
      emailPorDefecto: "",
      autocompletarDominio: true,

      // Cargos habituales en esta empresa. Aparecerán como sugerencias
      // en el formulario, pero el empleado puede escribir uno distinto
      // si el suyo no está en la lista. Añade o quita los que quieras.
      cargosComunes: [
        "Departamento de ventas",           // <-- SUSTITUYE/AMPLÍA esta lista
        "Gestión de viajes",
        "Administración y contabilidad",
        "Gestión de viajes para universidades",
        "Dirección"
      ],

      // Almantour tiene 2 oficinas. La de Almansa ES la línea de
      // urgencias/WhatsApp 24h. La de Caudete tiene su propio
      // teléfono, y además muestra el de urgencias como referencia.
      tieneVariasOficinas: true,
      oficinas: {
        almansa: {
          etiqueta: "Oficina Almansa",
          telefono: "967 34 33 46",         // <-- SUSTITUYE si cambia
          esLineaUrgencias: true,           // esta oficina ES la línea de emergencias
          direccion: "Corredera 43, Almansa (Albacete)", // <-- SUSTITUYE si cambia
          localidad: "Almansa (Albacete)"
        },
        caudete: {
          etiqueta: "Oficina Caudete",
          telefono: "965 82 72 26",         // <-- SUSTITUYE por el teléfono REAL de Caudete
          esLineaUrgencias: false,
          telefonoUrgenciasReferencia: "967 34 33 46", // el de Almansa, no lo toques salvo que cambie
          direccion: "Calle Ejemplo 5, Caudete (Albacete)", // <-- SUSTITUYE por la dirección REAL
          localidad: "Caudete (Albacete)"
        }
      },

      redes: {
        facebook: "https://facebook.com/tuempresa",
        instagram: "https://instagram.com/tuempresa",
        linkedin: "https://linkedin.com/company/tuempresa",
        whatsapp: "https://wa.me/34967343346"
      },
      mostrarRedes: {
        facebook: true,
        instagram: true,
        linkedin: true,
        whatsapp: true
      }
    },

    // ---------------------- MONTESCAR ----------------------
    montescar: {
      nombreMostrado: "Montescar",
      colorAcento: "#D4AF37",
      logoCuadrado: "assets/montescar/logo-cuadrado.png",
      logoHorizontal: "assets/montescar/logo-horizontal.png",
      web: "www.montescar.com",            // <-- SUSTITUYE por la web real
      dominioEmail: "montescar.es",
      emailPorDefecto: "autocares@montescar.es",
      autocompletarDominio: false,

      // Cargos habituales en esta empresa (ver comentario equivalente
      // en Almantour más arriba)
      cargosComunes: [
        "Asistente de Dirección Comercial", // <-- SUSTITUYE/AMPLÍA esta lista
        "Administración",
        "Comercial"
      ],

      // Montescar solo tiene una oficina (si en el futuro tiene más,
      // se copia el patrón de "almantour" de arriba)
      tieneVariasOficinas: false,
      oficinas: {
        principal: {
          etiqueta: "",                     // vacío = no se muestra etiqueta de oficina
          telefono: "967 00 00 00",         // <-- SUSTITUYE por el teléfono REAL
          esLineaUrgencias: false,
          direccion: "Calle Ejemplo 8, Almansa (Albacete)", // <-- SUSTITUYE por la dirección REAL
          localidad: "Villena (Alicante)"
        }
      },

      redes: {
        facebook: "https://facebook.com/tuempresa",
        instagram: "https://instagram.com/tuempresa",
        linkedin: "https://linkedin.com/company/tuempresa",
        whatsapp: ""
      },
      mostrarRedes: {
        facebook: true,
        instagram: true,
        linkedin: true,
        whatsapp: false
      }
    }

  },

  universidades: {
    ua: { nombre: "Universidad de Alicante", correos: ["ua@almantour.com"] },
    usal: { nombre: "Universidad de Salamanca", correos: ["usal@almantour.com"] },
    uji: { nombre: "Universitat Jaume I", correos: ["uji@almantour.com"] },
    umh: { nombre: "Universidad Miguel Hernández", correos: ["umh@almantour.com"] }
  },
  // Texto legal corto que aparece al final de toda firma
  disclaimer: "Aviso legal: este mensaje puede contener información confidencial. Si no es el destinatario, notifíquelo y elimínelo. Tratamos sus datos conforme al RGPD."
};


let CONFIG = CONFIG_LOCAL;

function urlConfiguracionExterna() {
  if (window.location.protocol === 'file:') return null;
  if (window.location.protocol === 'moz-extension:') {
    return `https://${CONFIG_LOCAL.githubUser}.github.io/${CONFIG_LOCAL.repoName}/configuracion.json`;
  }
  return new URL('configuracion.json', window.location.href).href;
}

function configuracionValida(configuracion) {
  return Boolean(
    configuracion &&
    typeof configuracion === 'object' &&
    configuracion.githubUser &&
    configuracion.repoName &&
    configuracion.empresas &&
    Object.keys(configuracion.empresas).length &&
    configuracion.disclaimer
  );
}

async function cargarConfiguracion() {
  const url = urlConfiguracionExterna();
  if (!url) return CONFIG_LOCAL;

  try {
    const respuesta = await fetch(url, { cache: 'no-store' });
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    const externa = await respuesta.json();
    if (!configuracionValida(externa)) throw new Error('Formato de configuración no válido');
    CONFIG = externa;
  } catch (error) {
    console.warn('No se pudo cargar configuracion.json; se usará la copia interna.', error);
    CONFIG = CONFIG_LOCAL;
  }

  return CONFIG;
}

const CONFIG_READY = cargarConfiguracion();
// A partir de aquí, esto ya no hay que tocarlo para cambiar datos:
// construye la URL base donde viven las imágenes en GitHub Pages
function urlImagen(rutaRelativa) {
  return `https://${CONFIG.githubUser}.github.io/${CONFIG.repoName}/${rutaRelativa}`;
}
