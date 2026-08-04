// Diseños compactos para comunicaciones con clientes universitarios.
function generarFirmaUniversidadBase(d, colores) {
  const e = d.empresa;
  const logoTexto = colores.logo || e.logoUniversidades || e.logoHorizontal;
  const isotipo = colores.isotipo || e.isotipoUniversidades || e.logoCuadrado;
  const movil = d.movil
    ? `<span style="color:${colores.separador};">&nbsp;&nbsp;·&nbsp;&nbsp;</span><a href="tel:+34${telefonoSinEspacios(d.movil)}" style="color:${colores.datos};text-decoration:none;">${d.movil}</a>`
    : '';

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:'Lato',Arial,Helvetica,sans-serif;width:346px;margin:0 auto;text-align:center;">
  <tr>
    <td colspan="2" align="center" style="padding:0 0 5px 0;text-align:center;white-space:nowrap;line-height:18px;">
      <span style="font-family:'Poppins',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:${colores.nombre};">${d.nombreCompleto}</span>
      <span style="color:${colores.separador};">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
      <span style="font-family:'Poppins',Arial,Helvetica,sans-serif;font-size:10px;color:${colores.puesto};">${d.cargo}</span>
    </td>
  </tr>
  <tr>
    <td align="right" style="width:255px;text-align:right;vertical-align:middle;padding:0 2px 2px 0;">
      <img src="${urlImagen(logoTexto)}" alt="${e.nombreMostrado}" width="199" style="display:inline-block;border:0;">
    </td>
    <td rowspan="3" align="left" style="width:91px;text-align:left;vertical-align:middle;padding:0 0 0 2px;">
      <img src="${urlImagen(isotipo)}" alt="${e.nombreMostrado}" width="86" style="display:inline-block;border:0;">
    </td>
  </tr>
  <tr>
    <td align="center" style="font-size:10px;color:${colores.datos};text-align:center;white-space:nowrap;padding:1px 0 5px 0;">
      <a href="tel:+34${telefonoSinEspacios(d.oficina.telefono)}" style="color:${colores.datos};text-decoration:none;">${d.oficina.telefono}</a><sup style="font-size:6.5px;font-weight:700;color:${e.colorAcento};vertical-align:super;line-height:0;">24H</sup>${movil}
    </td>
  </tr>
  <tr>
    <td align="center" style="font-size:8.5px;color:${colores.datos};text-align:center;white-space:nowrap;padding:0;">
      <a href="mailto:${d.email}" style="color:${colores.datos};text-decoration:none;">${d.email}</a>
      <span style="color:${colores.separador};">&nbsp;&nbsp;·&nbsp;&nbsp;</span><a href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(d.oficina.direccion)}" style="color:${colores.datos};text-decoration:none;">${d.oficina.direccion}</a>
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center" style="padding-top:8px;font-size:7px;color:${colores.legal};line-height:10px;text-align:left;">${CONFIG.disclaimer}</td>
  </tr>
</table>`;
}

function generarFirmaUniversidadApagada(d) {
  return generarFirmaUniversidadBase(d, {
    nombre: '#D5803E',
    puesto: '#756666',
    datos: '#4D4D4D',
    separador: '#8A8080',
    legal: '#999999'
  });
}

function generarFirmaUniversidadCorporativa(d) {
  return generarFirmaUniversidadBase(d, {
    nombre: d.empresa.colorAcento,
    puesto: '#555555',
    datos: '#333333',
    separador: '#888888',
    legal: '#AAAAAA',
    logo: d.empresa.logoUniversidadesCorporativo,
    isotipo: d.empresa.isotipoUniversidadesCorporativo
  });
}