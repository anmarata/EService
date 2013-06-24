function Reporte() {
    this.id;
    this.pais_id;
    this.area_id;
    this.nro_reporte;
    this.usr;
    this.cliente_id;
    this.sucursal_id;
    this.equipo_id;
    this.tiposolicitud_id;
    this.motivo;
    this.labor;
    this.observaciones;
    this.cliente_recibe;
    this.usr_atiende_id;
    this.finalizado;
    this.cliente_nombre;
    this.calificacion;
    this.email;
    this.telefono;
    this.fechaini;
    this.fechafin;
    this.hora_capacitacion;
    this.idsol;
    this.tiempotraslado;
    this.diferencia;
}
var Reportes = {
    Nuevo: function () {
        DB.Execute("Select * from clientes ", function (result) { ArmarSelect("#cboCliente", result, 0); });
        DB.Execute("Select * from sucursal where IDCLI = " + $("#cboCliente").val(), function (result) { ArmarSelect("#cboSucursal", result, 0); });
        DB.Execute("Select * from EQUIPOS where IDSUC = " + $("#cboSucursal").val(), function (result) { ArmarSelect("#cboEquipo", result, 0); });
        DB.Execute("Select * from TIPOSOLICITUD ", function (result) { ArmarSelect("#cboTipoServicio", result, 0); });
        $("#txtMotivo").val('');
        $("#txtLabor").val('');
        $("#txtObservacion").val('');
        $("#txtFecInicial").val(getFechas());
        $("#cboRepHoraInicio").val(getHora());
        $("#txtFecFinal").val(getFechas());
        $("#cboRepHoraFinal").val(getHora());
        $("#txtClienteRecibe").val('');
        $("#txtEmail").val('');
        $("#chkFinalizado").attr("checked", "true");
        $("#chkFinalizado").prop("checked", true).checkboxradio("refresh");
        $("#txtTelefono").val('');
        $("#txtHorasCapacitacion").val('');
        $("#cboTiempotraslado").val('00:00');
    },
    Guardar: function () { },
    Validar: { FechaApertura: function () { }, FechaCierre: function () { } }
}