/* ============================================================
   REGISTRO DE DISEÑOS
   Aquí se apuntan todos los estilos de firma disponibles.

   CÓMO AÑADIR UN DISEÑO NUEVO EN EL FUTURO (sin tocar nada más):
     1. Escribe una función nueva "generarFirmaTuNombre(d)" arriba,
        siguiendo el mismo patrón que las dos que ya existen
        (recibe los datos "d" y devuelve un string de HTML con tablas).
     2. Añade una línea aquí abajo, por ejemplo:
          tuClave: { etiqueta: "Nombre que verá el empleado", generar: generarFirmaTuNombre }
     3. Listo — aparecerá solo en el desplegable del formulario,
        no hay que tocar ni el formulario ni el botón de generar.
   ============================================================ */
const ESTILOS = {
  combinada:   { etiqueta: "Combinada (logo + línea de color)", generar: generarFirmaCombinada },
  minimalista: { etiqueta: "Minimalista",                        generar: generarFirmaMinimalista }
};
