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
    this.revisionSeguridad;
}
var Reportes = {
    Nuevo: function () {
        Sol_ID = 0;
        DB.Execute("Select * from clientes where idPais = " + $("#cboPais").val(), function (result) { ArmarSelect("#cboCliente", result, 0); });
        DB.Execute("Select * from sucursal where IDCLI = " + $("#cboCliente").val(), function (result) { ArmarSelect("#cboSucursal", result, 0); });
        DB.Execute("Select * from EQUIPOS where IDSUC = " + $("#cboSucursal").val(), function (result) { ArmarSelect("#cboEquipo", result, 0); });
        DB.Execute("Select * from TIPOSOLICITUD where idarea=" + $("#cboArea").val(), function (result) { ArmarSelect("#cboTipoServicio", result, 0); });
        $("#txtMotivo").val('');
        $("#txtLabor").val('');
        $("#txtObservacion").val('');
        $("#txtFecInicial").val(getFechas());
        CboVal("#cboRepHoraInicio", getHora());
        $("#txtFecFinal").val(getFechas());
        CboVal("#cboRepHoraFinal", getHora());
        $("#txtClienteRecibe").val('');
        $("#txtEmail").val('');
        $("#chkFinalizado").attr("checked", "true");
        $("#chkFinalizado").prop("checked", true).checkboxradio("refresh");

        $("#chkRevisionSeguridad").attr("checked", "false");
        $("#chkRevisionSeguridad").prop("checked", false).checkboxradio("refresh");

        $("#txtTelefono").val('');
        $("#txtHorasCapacitacion").val(0);
        $("#cboTiempotraslado").val('00:00');
    },
    Guardar: function () {
        $.mobile.loading("show", { text: "Guardando Reporte", textVisible: true, theme: "b", textonly: false, html: "" });
        var rep = new Reporte();

        rep.id = "0";
        rep.pais_id = $("#cboPais").val(); //_user.Permisos.Paises;
        rep.area_id = $("#cboArea").val();//_user.Permisos.Areas;
        //rep.nro_reporte = "";
        rep.nro_reporte = $("#txtNumeroReporte").val();
        rep.usr = _user.login;
        rep.cliente_id = $("#cboCliente").val();
        rep.sucursal_id = $("#cboSucursal").val();
        rep.equipo_id = $("#cboEquipo").val();
        rep.tiposolicitud_id = $("#cboTipoServicio").val();
        rep.motivo = $("#txtMotivo").val();
        rep.labor = $("#txtLabor").val();
        rep.observaciones = $("#txtObservacion").val();
        rep.cliente_recibe = $("#txtClienteRecibe").val();
        rep.usr_atiende_id = _user.ID;
        rep.finalizado = chkFinalizado.checked; //$("#nmchkfin").val();
        rep.cliente_nombre = $("#cboCliente option:selected").text();
        rep.calificacion = 'No Aplica';
        rep.email = $("#txtEmail").val();
        rep.telefono = $("#txtTelefono").val();
        rep.fechaini = $("#txtFecInicial").val() + " " + $("#cboRepHoraInicio").val();
        rep.fechafin = $("#txtFecFinal").val() + " " + $("#cboRepHoraFinal").val();
        rep.hora_capacitacion = $("#txtHorasCapacitacion").val();
        rep.revisionSeguridad = chkRevisionSeguridad.checked;
        if (Sol_ID == 0)
            rep.idsol = [];
        else
            rep.idsol = [Sol_ID];
        rep.tiempotraslado = $("#cboTiempotraslado").val();
        rep.diferencia = diferencia;
        $.ajax({
            type: "POST",
            url: "http://eservice.rochembiocare.com/html5/rest/reportes.aspx/GuardarReportes",
            data: JSON.stringify(rep),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d.Exito) {
                    Solicitudes.Lista();
                }
                else { alert(data.d.Descripcion); }
                $.mobile.loading("hide");
            }
        });
    },
    Cargar: function () {
        $.mobile.loading("show", { text: "Cargando Reportes", textVisible: true, theme: "b", textonly: false, html: "" });
        $.ajax({
            type: "POST",
            url: "http://eservice.rochembiocare.com/html5/rest/solicitudes.aspx/solicitud",
            data: "{ 'id':" + Sol_ID + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                DB.Execute("Select * from clientes where ID = " + data.d.ClienteId, function (result) { ArmarSelect("#cboCliente", result, data.d.ClienteId); });
                DB.Execute("Select * from sucursal where ID = " + data.d.SucursalesId, function (result) { ArmarSelect("#cboSucursal", result, data.d.SucursalesId); });
                DB.Execute("Select * from EQUIPOS where ID = " + data.d.EquipoId, function (result) { ArmarSelect("#cboEquipo", result, data.d.EquipoId); });
                DB.Execute("Select * from TIPOSOLICITUD where ID=" + data.d.TipoSolicitudId, function (result) { ArmarSelect("#cboTipoServicio", result, data.d.TipoSolicitudId); });

                $("#cboPais").val(data.d.PaisId);
                $('#cboPais').selectmenu("refresh", true);

                $("#cboArea").val(data.d.AreaId);
                $('#cboArea').selectmenu("refresh", true);
                
                $("#txtMotivo").val(data.d.Motivo);
                $("#txtLabor").val('');
                $("#txtObservacion").val('');
                $("#txtFecInicial").val(getFechas());
                CboVal("#cboRepHoraInicio", getHora());
                $("#txtFecFinal").val(getFechas());
                CboVal("#cboRepHoraFinal", getHora());
                $("#txtClienteRecibe").val('');
                $("#txtEmail").val(data.d.Email);
                $("#chkFinalizado").attr("checked", "true");
                $("#chkFinalizado").prop("checked", true).checkboxradio("refresh");
                $("#txtTelefono").val('');
                $("#txtHorasCapacitacion").val(0);
                $("#cboTiempotraslado").val('00:00');
                $.mobile.loading("hide");
            }
        });
    },
    Validar: {
        FechaApertura: function () {

        },
        FechaCierre: function (envio) {
            $.mobile.loading("show", { text: "Validando Fecha", textVisible: true, theme: "b", textonly: false, html: "" });
            var _fechafin = $("#txtFecFinal").val() + " " + $("#cboRepHoraFinal").val();
            $.ajax({
                type: "POST",
                url: "http://eservice.rochembiocare.com/html5/rest/reportes.aspx/ValidarFecha",
                data: "{'fechafin':'" + _fechafin + "', 'TimeReport':'" + _user.Permisos.TimeReport + "', 'diferencia' : '" + diferencia + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (!data.d) {
                        //updateTips('La Fecha a Superado el tope', $("#txtnmFecha"));
                        //$("#nmtxtFecFin").addClass("ui-state-error");
                        //$("#nmddhora2").addClass("ui-state-error");
                        //$(".ui-dialog-buttonpane button:contains('Aceptar')").removeAttr('disabled').removeClass("ui-state-disabled");
                    }
                    else if (envio) {
                        Reportes.Guardar();
                    }
                    $.mobile.loading("hide");
                }
            });
        }
    }
}