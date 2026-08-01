# Cómo instalar y utilizar el generador en Thunderbird

El archivo que debes instalar es `generador-firmas-thunderbird-2.1.0.xpi`.

## Requisito

Necesitas Thunderbird 128 o una versión posterior.

## Instalación

1. Abre Thunderbird.
2. Pulsa el botón de menú de las tres rayas, situado arriba a la derecha.
3. Entra en **Complementos y temas**.
4. Pulsa el botón con forma de rueda dentada.
5. Elige **Instalar complemento desde archivo…**.
6. Selecciona `generador-firmas-thunderbird-2.1.0.xpi`.
7. Acepta los permisos solicitados.

El permiso para leer y modificar identidades es necesario para localizar tus direcciones de correo y guardar la firma en la dirección seleccionada. El complemento no envía correos ni guarda datos personales fuera de Thunderbird.

## Crear e instalar una firma

1. Pulsa el icono del sobre del generador en la barra de Thunderbird.
2. Se abrirá el generador en una pestaña.
3. En **Cuenta o dirección de Thunderbird**, elige la dirección que utilizará la firma.
4. Selecciona la empresa y la oficina.
5. Revisa o completa tu nombre, apellidos, cargo y móvil.
6. Elige el diseño.
7. Pulsa **Generar vista previa**.
8. Revisa la firma.
9. Pulsa **Guardar esta firma en Thunderbird**.

La firma se asignará solamente a la dirección seleccionada. Si esa dirección ya tenía una firma HTML, será sustituida.

## Comprobar el resultado

1. Abre un mensaje nuevo en Thunderbird.
2. Comprueba que el campo **De** contiene la dirección a la que asignaste la firma.
3. La firma debería aparecer automáticamente.

Si tienes varias direcciones, repite el proceso para cada una.

## Actualizar la firma

Cuando cambie algún dato, abre nuevamente el generador, selecciona la misma dirección, crea la firma y vuelve a guardarla. La versión anterior será reemplazada.
## Publicar diseños nuevos en la extensión

Los diseños se modifican una sola vez en la carpeta principal `js/templates`.

Después de añadir o cambiar un diseño:

1. Haz doble clic en `CREAR-EXTENSION-THUNDERBIRD.cmd`.
2. Espera al mensaje verde que confirma que la extensión se ha creado.
3. Instala el nuevo archivo `.xpi` en Thunderbird.

No debes modificar manualmente la carpeta `thunderbird-extension/js/templates`, porque el generador automático la reemplaza con las plantillas principales.

## Desinstalar el complemento

1. Abre **Complementos y temas**.
2. Busca **Generador de firmas Almantour y Montescar**.
3. Pulsa el botón de los tres puntos.
4. Elige **Eliminar**.

Desinstalar el complemento no elimina automáticamente una firma que ya se haya guardado en una identidad de Thunderbird.
