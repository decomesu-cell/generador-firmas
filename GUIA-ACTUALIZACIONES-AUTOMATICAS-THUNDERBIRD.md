# Actualizaciones automáticas del complemento Thunderbird

## Qué cambia

La versión `2.2.0` es la primera preparada para buscar actualizaciones automáticamente en GitHub Pages.

Esta versión se instala manualmente una sola vez en cada ordenador. Después, las versiones nuevas se descargan desde:

`https://decomesu-cell.github.io/generador-firmas/actualizaciones-thunderbird/updates.json`

## Primera publicación e instalación

1. Abre GitHub Desktop.
2. Comprueba que aparecen la carpeta `actualizaciones-thunderbird` y los nuevos archivos del publicador.
3. En **Summary** escribe: `Añadir actualizaciones automáticas de Thunderbird`.
4. Pulsa **Commit to main**.
5. Pulsa **Push origin**.
6. Espera unos minutos hasta que GitHub Pages publique los archivos.
7. Comprueba que se abre esta dirección en el navegador:
   `https://decomesu-cell.github.io/generador-firmas/actualizaciones-thunderbird/updates.json`
8. Instala `generador-firmas-thunderbird-2.2.0.xpi` en cada uno de los diez ordenadores. No es necesario desinstalar primero la versión anterior: Thunderbird debe reconocer el mismo identificador y actualizarla.
9. En **Complementos y temas**, abre el complemento y deja **Permitir actualizaciones automáticas** en `Predeterminado` o `Activado`.

## Publicar una actualización futura

1. Modifica y prueba el generador.
2. Haz doble clic en `PUBLICAR-ACTUALIZACION-THUNDERBIRD.cmd`.
3. La herramienta incrementará automáticamente la versión; por ejemplo, `2.2.0` pasará a `2.2.1`.
4. Espera al mensaje verde **Actualización preparada correctamente**.
5. Abre GitHub Desktop.
6. En **Summary** escribe una descripción breve del cambio.
7. Pulsa **Commit to main** y después **Push origin**.

Thunderbird comprobará periódicamente si existe una versión superior. También se puede forzar la comprobación desde **Complementos y temas → rueda dentada → Buscar actualizaciones**.

## Archivos que crea la herramienta

- El nuevo instalador `.xpi`.
- `actualizaciones-thunderbird/updates.json`.
- `actualizaciones-thunderbird/ultima-version.json`.
- Una copia del `.xpi` dentro de `actualizaciones-thunderbird` para publicarla en GitHub Pages.

## Regla importante

No cambies manualmente el número de versión ni `updates.json`. Utiliza siempre `PUBLICAR-ACTUALIZACION-THUNDERBIRD.cmd` para evitar que Thunderbird rechace la actualización por una versión o huella incorrectas.