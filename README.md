# Generador de firmas 2.0

Aplicación estática y autoservicio para crear firmas de Almantour y Montescar. No almacena datos personales y puede publicarse directamente en GitHub Pages.

## Estructura

- `index.html`: entrada de la aplicación.
- `css/app.css`: diseño del generador y adaptación móvil.
- `js/config.js`: empresas, oficinas, correos, teléfonos, redes, logos y colores.
- `js/form.js`: construcción e interacción del formulario.
- `js/validation.js`: validaciones y lectura de datos.
- `js/utils.js`: funciones comunes para generar HTML compatible con correo.
- `js/templates/`: un archivo por diseño y un registro central.
- `js/exporters.js`: copia y descarga para Thunderbird.
- `js/mobile.js`: comportamiento de vista previa en móvil.

## Añadir un diseño estacional o de campaña

1. Crea un archivo dentro de `js/templates/`, por ejemplo `navidad.js`.
2. Define una función `generarFirmaNavidad(d)` que devuelva el HTML de la firma.
3. Carga el archivo en `index.html` antes de `js/templates/registro.js`.
4. Añade la plantilla al objeto `ESTILOS` de `js/templates/registro.js`.

El diseño aparecerá automáticamente en el selector. No es necesario modificar el formulario, las validaciones ni los exportadores.