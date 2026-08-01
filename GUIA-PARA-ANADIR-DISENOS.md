# Guía sencilla para añadir un diseño nuevo

Esta guía está escrita para personas sin experiencia en programación. No necesitas entender todo el código: solo debes copiar un archivo, cambiar algunos textos y añadir dos líneas.
## Importante: el diseño se modifica una sola vez

La carpeta principal `js/templates` es la fuente única de diseños. No debes modificar manualmente las copias que hay dentro de `thunderbird-extension`.

Cuando termines un diseño:

1. La versión web ya estará actualizada.
2. Haz doble clic en `CREAR-EXTENSION-THUNDERBIRD.cmd`.
3. Espera hasta que aparezca el mensaje verde **Extensión creada correctamente**.
4. Se generará un nuevo archivo `.xpi` con los mismos diseños.

Por tanto, no tienes que repetir el diseño para Thunderbird.

## Antes de empezar

Haz una copia completa de la carpeta `GENERADOR DE FIRMAS`. Si algo sale mal, podrás recuperar la versión anterior.

Para añadir un diseño nuevo trabajaremos siempre con estos dos lugares:

- La carpeta `js/templates`, donde se guarda cada diseño.
- El archivo `index.html`, que indica qué archivos debe cargar la aplicación.
- El archivo `js/templates/registro.js`, que contiene la lista de diseños disponibles.

## Ejemplo: crear un diseño de Navidad

### Paso 1. Copiar una plantilla existente

1. Abre la carpeta `GENERADOR DE FIRMAS`.
2. Entra en `js` y después en `templates`.
3. Copia el archivo `combinada.js`.
4. Pega la copia en la misma carpeta.
5. Cambia el nombre de la copia a `navidad.js`.

Es importante que el nombre termine en `.js`. Si Windows oculta las extensiones, activa **Ver → Mostrar → Extensiones de nombre de archivo** en el Explorador.

### Paso 2. Cambiar el nombre de la función

1. Abre `navidad.js` con el Bloc de notas o con Visual Studio Code.
2. Busca esta línea:

```javascript
function generarFirmaCombinada(d) {
```

3. Sustitúyela por:

```javascript
function generarFirmaNavidad(d) {
```

No cambies la letra `d`, los paréntesis ni la llave `{`.

### Paso 3. Personalizar el diseño

En `navidad.js` puedes cambiar colores, imágenes y textos. Haz un cambio cada vez y prueba la aplicación después de cada cambio.

#### Cambiar la línea de color

Busca:

```javascript
background-color:${e.colorAcento};
```

Para usar verde navideño, sustitúyelo por:

```javascript
background-color:#1F7A3D;
```

Los colores se escriben con `#` y seis caracteres. Por ejemplo:

- Verde: `#1F7A3D`
- Rojo: `#B52222`
- Dorado: `#C9A227`

#### Añadir un mensaje navideño

Busca el comienzo de la tabla:

```html
<table role="presentation"
```

Justo después de la primera etiqueta `<table ...>` completa puedes añadir una fila como esta:

```html
<tr>
  <td colspan="3" style="padding-bottom:10px; color:#B52222; font-size:13px; font-weight:bold;">
    ¡Felices fiestas!
  </td>
</tr>
```

Si no tienes claro dónde colocar este bloque, es mejor limitarse inicialmente a cambiar colores y solicitar ayuda para cambios estructurales.

#### Usar un logotipo especial

1. Guarda el logotipo navideño dentro de la carpeta de recursos de la empresa, por ejemplo:

```text
assets/almantour/logo-navidad.png
```

2. En la plantilla busca:

```javascript
e.logoCuadrado
```

3. Puedes sustituirlo por una ruta fija:

```javascript
'assets/almantour/logo-navidad.png'
```

Este cambio usaría siempre el logotipo de Almantour. Si el diseño debe servir también para Montescar, cada empresa debe tener configurado su propio logotipo estacional. En ese caso conviene solicitar la preparación de esa configuración.

### Paso 4. Cargar el archivo nuevo

1. Vuelve a la carpeta principal `GENERADOR DE FIRMAS`.
2. Abre `index.html`.
3. Busca estas líneas cerca del final:

```html
<script src="js/templates/combinada.js"></script>
<script src="js/templates/minimalista.js"></script>
<script src="js/templates/registro.js"></script>
```

4. Añade la línea de Navidad antes de `registro.js`:

```html
<script src="js/templates/combinada.js"></script>
<script src="js/templates/minimalista.js"></script>
<script src="js/templates/navidad.js"></script>
<script src="js/templates/registro.js"></script>
```

El orden es importante: `navidad.js` debe aparecer antes de `registro.js`.

### Paso 5. Añadir Navidad a la lista de diseños

1. Abre `js/templates/registro.js`.
2. Busca este bloque:

```javascript
const ESTILOS = {
  combinada:   { etiqueta: "Combinada (logo + línea de color)", generar: generarFirmaCombinada },
  minimalista: { etiqueta: "Minimalista", generar: generarFirmaMinimalista }
};
```

3. Sustitúyelo por:

```javascript
const ESTILOS = {
  combinada:   { etiqueta: "Combinada (logo + línea de color)", generar: generarFirmaCombinada },
  minimalista: { etiqueta: "Minimalista", generar: generarFirmaMinimalista },
  navidad:     { etiqueta: "Especial Navidad", generar: generarFirmaNavidad }
};
```

Observa la coma añadida al final de la línea de `minimalista`. Sin esa coma, la aplicación no funcionará.

### Paso 6. Probar el diseño

1. Guarda todos los archivos modificados.
2. Abre `index.html` en el navegador.
3. Elige una empresa.
4. Rellena el formulario.
5. Abre el campo **Estilo de firma**.
6. Comprueba que aparece **Especial Navidad**.
7. Genera la firma y revisa la vista previa.

Si el navegador ya estaba abierto, pulsa `Ctrl + F5` para forzar la recarga de los archivos.
### Paso 7. Actualizar la extensión de Thunderbird

1. Guarda y cierra los archivos que hayas modificado.
2. Vuelve a la carpeta principal `GENERADOR DE FIRMAS`.
3. Haz doble clic en `CREAR-EXTENSION-THUNDERBIRD.cmd`.
4. Espera a que aparezca el mensaje **Extensión creada correctamente**.
5. Instala el archivo `.xpi` recién generado en Thunderbird.

El proceso copia automáticamente todos los diseños de `js/templates` a la extensión. No copies archivos manualmente a `thunderbird-extension`.

## Si el diseño nuevo no aparece

Comprueba estos puntos en orden:

1. El archivo se llama exactamente `navidad.js` y no `navidad.js.txt`.
2. `index.html` contiene la línea `<script src="js/templates/navidad.js"></script>`.
3. Esa línea aparece antes de `js/templates/registro.js`.
4. La función se llama exactamente `generarFirmaNavidad` en `navidad.js`.
5. `registro.js` también utiliza exactamente `generarFirmaNavidad`.
6. Hay una coma después de la línea de `minimalista`.
7. Has guardado todos los archivos y recargado con `Ctrl + F5`.

## Cómo deshacer el diseño

Para retirar Navidad sin borrar el trabajo:

1. Abre `js/templates/registro.js`.
2. Elimina la línea que empieza por `navidad:`.
3. Elimina también la coma final de la línea anterior si Navidad era el último elemento.
4. En `index.html`, elimina la línea que carga `js/templates/navidad.js`.

Puedes conservar el archivo `navidad.js` para volver a utilizarlo en el futuro.

## Recomendación importante

Para cambios sencillos puedes modificar textos y colores siguiendo esta guía. Para cambiar la distribución, añadir banners, usar logotipos distintos según la empresa o activar diseños automáticamente por fechas, es más seguro preparar el diseño como una campaña dentro del proyecto.
