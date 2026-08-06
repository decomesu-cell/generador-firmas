# Contexto del proyecto: Generador de firmas

## Objetivo

Aplicación web y complemento de Thunderbird para que cada empleado genere e instale su propia firma. No se guardan datos personales de empleados. La administración mantiene empresas, oficinas, teléfonos, redes, diseños y campañas.

## Empresas actuales

- Almantour.
- Montescar.

La configuración común está en `configuracion.json` y `js/config.js`. La aplicación web intenta cargar primero `configuracion.json` y conserva `js/config.js` como respaldo.

## Arquitectura

- `index.html`: entrada de la aplicación web.
- `css/`: estilos del generador.
- `js/`: formulario, validaciones, exportadores y utilidades.
- `js/templates/`: diseños de firma.
- `thunderbird-extension/`: código fuente del complemento.
- `crear-extension-thunderbird.ps1`: sincroniza el código compartido y genera el XPI.
- `publicar-actualizacion-thunderbird.ps1`: incrementa la versión, genera el XPI y prepara la actualización automática.
- `actualizaciones-thunderbird/`: archivos publicados mediante GitHub Pages.

## Diseños actuales

- Combinada.
- Minimalista.
- Universidad · tonos apagados.
- Universidad · colores corporativos.

La casilla de diseños universitarios está siempre disponible. Al activarla se muestran los diseños universitarios generales. En el futuro se podrán añadir diseños específicos para UA, USAL, UJI y UMH.

## Diseño universitario definitivo

- Anchura total: 400 px.
- Alineación interna centrada; la firma completa se coloca en el borde izquierdo del correo.
- Nombre: Poppins, 18 px, peso regular.
- Puesto: Poppins, 14 px.
- Datos: Lato, 12 px.
- Aviso legal: 8 px, alineado a la izquierda.
- Logotipo de letras: 180 px.
- Isotipo: 60 px.
- Separación entre ambos: 14 px.
- Compensador de la fila de logotipos: 30 px; márgenes visuales: 58 px.
- Las filas de teléfonos, correo/localidad y emergencias están desplazadas 16 px hacia la izquierda.
- En Caudete, emergencias aparece en una fila independiente justo antes del aviso legal.
- La fila de emergencias utiliza un compensador invisible de 8 px a la izquierda.
- La dirección se resume como `Ciudad (Provincia)`.
- La fila `24H` usa el color de acento corporativo.

## Separación respecto al texto del correo

Todas las firmas, de todas las empresas y diseños presentes o futuros, pasan por `envolverFirmaConSeparador()`.

- Línea superior: `1px solid #d9d9d9`.
- Separación inferior de la línea: 12 px.
- El bloque exterior ocupa una fila completa y usa `clear: both`, por lo que el texto del correo no puede quedar en la misma línea que la firma.
- La línea gris conserva únicamente la anchura natural de cada firma.

## Thunderbird

- Identificador estable: `generador-firmas@almantour.es`.
- Versión base con actualizaciones automáticas: `2.2.0`.
- Thunderbird mínimo: 128.0.
- URL del manifiesto de actualización:
  `https://decomesu-cell.github.io/generador-firmas/actualizaciones-thunderbird/updates.json`

La versión 2.2.0 debe instalarse manualmente una sola vez en cada ordenador. Las versiones posteriores se publican ejecutando `PUBLICAR-ACTUALIZACION-THUNDERBIRD.cmd` y enviando después los archivos a GitHub.

## Flujo de trabajo recomendado

1. Trabajar siempre en la copia clonada de GitHub.
2. Modificar y probar primero la aplicación web local.
3. Cuando el diseño esté aprobado, ejecutar `PUBLICAR-ACTUALIZACION-THUNDERBIRD.cmd`.
4. Revisar los archivos generados.
5. Publicar con GitHub Desktop.
6. Probar la actualización en un ordenador antes de extenderla al resto.

## Continuar desde otro ordenador

1. Clonar `decomesu-cell/generador-firmas` con GitHub Desktop.
2. Abrir la carpeta clonada en Codex.
3. Pedir: `Lee CONTEXTO-PROYECTO.md y continúa desde el estado actual`.

## Reglas importantes

- No modificar manualmente `updates.json` ni el número de versión de Thunderbird.
- No editar directamente las plantillas copiadas dentro de `thunderbird-extension/js/templates`; el generador las sustituye con las plantillas de `js/templates`.
- No introducir una base de datos de empleados.
- Mantener configuración, plantillas y lógica separadas.
- Probar la web antes de generar o publicar una nueva versión de Thunderbird.
