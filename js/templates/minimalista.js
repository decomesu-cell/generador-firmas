// -------- ESTILO 2: MINIMALISTA --------
function generarFirmaMinimalista(d) {
  const e = d.empresa;
  const lineaUrgencias = d.oficina.esLineaUrgencias
    ? `&nbsp;<sup style="font-size:7px;font-weight:700;color:${e.colorAcento};vertical-align:super;line-height:0;">24H</sup>`
    : '';
  const filaMovil = d.movil ? `<tr><td style="font-size:12px; color:#333333; padding-bottom:3px;">${enlaceTelefono(d.movil)}</td></tr>` : '';
  const filaUrgenciasReferencia = (!d.oficina.esLineaUrgencias && d.oficina.telefonoUrgenciasReferencia)
    ? `<tr><td style="font-size:11.5px; color:#666666; padding-bottom:4px;">Urgencias ${enlaceTelefono(d.oficina.telefonoUrgenciasReferencia)}&nbsp;<sup style="font-size:7px;font-weight:700;color:${e.colorAcento};vertical-align:super;line-height:0;">24H</sup></td></tr>`
    : '';

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif; width:440px;">
  <tr><td style="padding-bottom:16px;"><img src="${urlImagen(e.logoHorizontal)}" alt="${e.nombreMostrado}" width="160" style="display:block; border:0;"></td></tr>
  <tr><td style="font-size:16px; font-weight:bold; color:#1a1a1a; padding-bottom:2px;">${d.nombreCompleto}</td></tr>
  <tr><td style="font-size:12.5px; color:#888888; padding-bottom:14px;">${d.cargo}${d.oficina.etiqueta ? ' · ' + d.oficina.etiqueta : ''}</td></tr>

  <tr><td style="font-size:12px; color:#333333; padding-bottom:4px;">${enlaceTelefono(d.oficina.telefono)}${lineaUrgencias}</td></tr>
  ${filaUrgenciasReferencia}
  ${filaMovil}
  <tr><td style="font-size:12px; padding-bottom:4px;"><a href="mailto:${d.email}" style="color:#333333; text-decoration:none;">${d.email}</a></td></tr>
  <tr><td style="font-size:12px; color:#777777; padding-bottom:4px;">${enlaceDireccion(d.oficina.direccion)}</td></tr>
  <tr><td style="font-size:12px; padding-bottom:14px;"><a href="https://${e.web}" style="color:${e.colorAcento}; text-decoration:none;">${e.web}</a></td></tr>

  <tr><td style="padding-bottom:10px;">${filaRedesSociales(e.redes, e.mostrarRedes)}</td></tr>
  <tr><td style="font-size:9px; color:#cccccc; line-height:13px;">${CONFIG.disclaimer}</td></tr>
</table>`;
}
