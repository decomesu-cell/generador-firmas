// Diseños para comunicaciones con clientes universitarios.
function generarFirmaUniversidadBase(d, colores) {
  const e = d.empresa;
  const logoTexto = colores.logo || e.logoUniversidades || e.logoHorizontal;
  const isotipo = colores.isotipo || e.isotipoUniversidades || e.logoCuadrado;
  const localidad = d.oficina.localidad || d.oficina.direccion;
  const movil = d.movil
    ? `<span style="color:${colores.separador};">&nbsp;&nbsp;·&nbsp;&nbsp;</span><a href="tel:+34${telefonoSinEspacios(d.movil)}" style="color:${colores.datos};text-decoration:none;">${d.movil}</a>`
    : '';
  const anchoCabeceraEstimado = d.nombreCompleto.length * 9.5 + d.cargo.length * 6.5 + 30;
  const cabecera = anchoCabeceraEstimado <= 420
    ? `<tr><td align="center" style="padding:0 0 8px;text-align:center;line-height:22px;"><span style="font-family:'Poppins',Arial,Helvetica,sans-serif;font-size:16pt;font-weight:400;color:${colores.nombre};">${d.nombreCompleto}</span><span style="font-family:'Poppins',Arial,Helvetica,sans-serif;font-size:11pt;color:${colores.puesto};">&nbsp;&nbsp;·&nbsp;&nbsp;${d.cargo}</span></td></tr>`
    : `<tr><td align="center" style="padding:0;text-align:center;line-height:22px;"><span style="font-family:'Poppins',Arial,Helvetica,sans-serif;font-size:16pt;font-weight:400;color:${colores.nombre};">${d.nombreCompleto}</span></td></tr><tr><td align="center" style="padding:0 0 8px;text-align:center;line-height:18px;"><span style="font-family:'Poppins',Arial,Helvetica,sans-serif;font-size:11pt;color:${colores.puesto};">·&nbsp;&nbsp;${d.cargo}</span></td></tr>`;

  return `
<table role="presentation" width="440" cellpadding="0" cellspacing="0" border="0" align="center" style="font-family:'Lato',Arial,Helvetica,sans-serif;width:100%;max-width:440px;margin:0 auto;text-align:center;">
  ${cabecera}
  <tr>
    <td align="center" style="text-align:center;vertical-align:middle;padding:0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
        <tr>
          <td width="86" style="width:86px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
          <td align="center" style="text-align:center;vertical-align:middle;padding:0;"><img src="${urlImagen(logoTexto)}" alt="${e.nombreMostrado}" width="190" style="display:block;border:0;"></td>
          <td align="left" style="text-align:left;vertical-align:middle;padding:0 0 0 8px;"><img src="${urlImagen(isotipo)}" alt="${e.nombreMostrado}" width="78" style="display:block;border:0;"></td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td align="center" style="font-size:10pt;color:${colores.datos};text-align:center;padding:4px 0;">
      <a href="tel:+34${telefonoSinEspacios(d.oficina.telefono)}" style="color:${colores.datos};text-decoration:none;">${d.oficina.telefono}</a>&nbsp;<sup style="font-size:7px;font-weight:700;color:${e.colorAcento};vertical-align:super;line-height:0;">24H</sup>${movil}
    </td>
  </tr>
  <tr>
    <td align="center" style="font-size:10pt;color:${colores.datos};text-align:center;padding:0;">
      <a href="mailto:${d.email}" style="color:${colores.datos};text-decoration:none;">${d.email}</a><span style="color:${colores.separador};">&nbsp;&nbsp;·&nbsp;&nbsp;</span><a href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(d.oficina.direccion)}" style="color:${colores.datos};text-decoration:none;">${localidad}</a>
    </td>
  </tr>
  <tr>
    <td align="left" style="padding-top:10px;font-size:7pt;color:${colores.legal};line-height:10px;text-align:left;">${CONFIG.disclaimer}</td>
  </tr>
</table>`;
}

function generarFirmaUniversidadApagada(d) {
  return generarFirmaUniversidadBase(d, {
    nombre: '#D5803E', puesto: '#756666', datos: '#4D4D4D',
    separador: '#8A8080', legal: '#999999'
  });
}

function generarFirmaUniversidadCorporativa(d) {
  return generarFirmaUniversidadBase(d, {
    nombre: d.empresa.colorAcento, puesto: '#555555', datos: '#333333',
    separador: '#888888', legal: '#AAAAAA',
    logo: d.empresa.logoUniversidadesCorporativo,
    isotipo: d.empresa.isotipoUniversidadesCorporativo
  });
}