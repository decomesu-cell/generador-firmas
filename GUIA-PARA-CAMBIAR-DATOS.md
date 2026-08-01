# Guía para cambiar teléfonos, oficinas y redes sociales

Todos los datos comunes están en el archivo `configuracion.json` de la carpeta principal.

## Qué puedes cambiar

- Teléfonos fijos y de urgencias.
- Direcciones de oficinas.
- Nombres de oficinas.
- Páginas web.
- Dominios y correos predeterminados.
- Enlaces de Facebook, Instagram, LinkedIn y WhatsApp.
- Cargos habituales.
- Colores corporativos.
- Texto del aviso legal.
- Rutas de logotipos.

## Antes de modificarlo

1. Haz una copia de `configuracion.json`.
2. Abre el archivo con Visual Studio Code o con el Bloc de notas.
3. Cambia solamente el texto situado entre comillas después del nombre del dato.

Ejemplo para cambiar un teléfono:

```json
"telefono": "967 34 33 46"
```

Puedes sustituirlo por:

```json
"telefono": "967 11 22 33"
```

Conserva las comillas, los dos puntos y las comas.

## Cambiar una dirección

Busca la oficina correspondiente y modifica únicamente `direccion`:

```json
"direccion": "Corredera 43, Almansa (Albacete)"
```

## Cambiar una red social

Busca el bloque `redes` de la empresa:

```json
"redes": {
  "facebook": "https://facebook.com/tuempresa",
  "instagram": "https://instagram.com/tuempresa",
  "linkedin": "https://linkedin.com/company/tuempresa",
  "whatsapp": "https://wa.me/34967343346"
}
```

Sustituye únicamente la dirección de internet situada entre comillas.

Para ocultar una red, busca `mostrarRedes` y cambia su valor a `false`:

```json
"mostrarRedes": {
  "facebook": true,
  "instagram": true,
  "linkedin": true,
  "whatsapp": false
}
```

## Publicar el cambio

1. Guarda `configuracion.json`.
2. Sube ese archivo a la raíz del repositorio de GitHub, junto a `index.html`.
3. Espera unos minutos a que GitHub Pages publique el cambio.
4. Abre nuevamente el generador.

No necesitas crear otro `.xpi`. La web y la extensión instalada de Thunderbird descargarán la nueva configuración al abrir el generador.

## Si cometes un error

El complemento de Thunderbird utilizará automáticamente su copia interna si no puede leer la configuración publicada. Corrige `configuracion.json` y vuelve a subirlo.

También puedes recuperar la copia de seguridad que hiciste antes de modificarlo.

## Cuándo sí debes crear otro XPI

Debes generar otra extensión únicamente si cambias:

- El funcionamiento del generador.
- Las plantillas o su estructura HTML.
- Las campañas incluidas.
- Los permisos o la integración con Thunderbird.

Cambiar datos corporativos en `configuracion.json` no requiere otro instalador.
