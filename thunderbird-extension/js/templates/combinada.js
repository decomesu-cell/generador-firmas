// -------- ESTILO 1: COMBINADA (logo + línea vertical de color) --------
function generarFirmaCombinada(d) {
  const e = d.empresa;
  const telefonoLinea = d.oficina.esLineaUrgencias
    ? `${enlaceTelefono(d.oficina.telefono)}&nbsp;<sup style="font-size:7px;font-weight:700;color:${e.colorAcento};vertical-align:super;line-height:0;">24H</sup>`
    : enlaceTelefono(d.oficina.telefono);

  const filaUrgenciasReferencia = (!d.oficina.esLineaUrgencias && d.oficina.telefonoUrgenciasReferencia && d.mostrarUrgenciasReferencia !== false)
    ? `<tr><td style="font-size:11px; color:#777777; padding-bottom:4px; padding-left:22px;">
         Emergencias ${enlaceTelefono(d.oficina.telefonoUrgenciasReferencia)}&nbsp;<sup style="font-size:7px;font-weight:700;color:${e.colorAcento};vertical-align:super;line-height:0;">24H</sup>
       </td></tr>` : '';

  const filaMovil = d.movil
    ? `<tr><td style="font-size:12px; color:#333333; padding-bottom:4px;">${iconoImagen('assets/iconos/icono-movil.png','Móvil',14)}&nbsp;&nbsp;${enlaceTelefono(d.movil)}</td></tr>` : '';

  const filaOficinaEtiqueta = d.oficina.etiqueta
    ? `<tr><td style="font-size:10.5px; color:#999999; text-transform:uppercase; letter-spacing:0.5px; padding-bottom:8px;">${d.oficina.etiqueta}</td></tr>`
    : `<tr><td style="padding-bottom:4px;"></td></tr>`;

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif; width:540px;">
  <tr>
    <td style="vertical-align:middle; padding-right:16px; width:100px;">
      <img src="${urlImagen(e.logoCuadrado)}" alt="${e.nombreMostrado}" width="90" style="display:block; border:0;">
    </td>
    <td style="vertical-align:middle; width:16px; padding:0;">
      <table cellpadding="0" cellspacing="0" border="0" style="height:100px;"><tr><td style="width:2px; background-color:${e.colorAcento}; font-size:0; line-height:0;">&nbsp;</td></tr></table>
    </td>
    <td style="vertical-align:top; padding-left:16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:15px; font-weight:bold; color:#1a1a1a; letter-spacing:0.3px; padding-bottom:1px;">${d.nombreCompleto.toUpperCase()}</td></tr>
        <tr><td style="font-size:12px; color:#777777; padding-bottom:3px;">${d.cargo}</td></tr>
        ${filaOficinaEtiqueta}

        <tr><td style="font-size:12.5px; color:#333333; padding-bottom:3px;">${iconoImagen('assets/iconos/icono-telefono.png','Tel',14)}&nbsp;&nbsp;${telefonoLinea}</td></tr>
        ${filaUrgenciasReferencia}
        ${filaMovil}

        <tr><td style="font-size:12px; padding-bottom:4px;">${iconoImagen('assets/iconos/icono-email.png','Email',14)}&nbsp;&nbsp;<a href="mailto:${d.email}" style="color:#333333; text-decoration:none;">${d.email}</a></td></tr>

        <tr><td style="font-size:12px; color:#333333; padding-bottom:4px;">${iconoImagen('assets/iconos/icono-direccion.png','Dirección',14)}&nbsp;&nbsp;${enlaceDireccion(d.oficina.direccion)}</td></tr>

        <tr><td style="font-size:12px; padding-bottom:8px;">${iconoImagen('assets/iconos/icono-web.png','Web',14)}&nbsp;&nbsp;<a href="https://${e.web}" style="color:${e.colorAcento}; text-decoration:none;">${e.web}</a></td></tr>

        <tr><td style="padding-bottom:8px;">${filaRedesSociales(e.redes, e.mostrarRedes)}</td></tr>
      </table>
    </td>
  </tr>
  <tr><td colspan="3" style="padding-top:10px; border-top:1px solid #eeeeee; font-size:9px; color:#aaaaaa; line-height:13px;">
    ${CONFIG.disclaimer}
  </td></tr>
</table>`;
}
