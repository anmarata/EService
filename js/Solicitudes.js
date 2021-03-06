﻿function Solicitud()
{
    this.id;
    this.fecha;
    this.TipoSolic;
    this.pais;
    this.area;
    this.cliente;
    this.equipo;
    this.motivo;
    this.solicita;
    this.usuario;
    this.sucursal;
    this.email;
    this.user;
    this.diferencia;

}

var Sol_ID = 0;
var Solicitudes = {
    Lista: function () {
        $.mobile.changePage("#pagListSol", {
            transition: "none",
            reverse: false,
            changeHash: false
        });
        Solicitudes.RecuperarGrid();
    },
    RecuperarGrid: function () {
        $.mobile.loading("show", { text: "Cargando Solicitudes", textVisible: true, theme: "b", textonly: false, html: "" });
        $.ajax({
            type: "POST",
            url: "http://eservice.rochembiocare.com/rest/Catalogos.ashx?c=SOL&p=" + _user.Permisos.Paises + "&a=" + _user.Permisos.Areas + "&u=" + _user.login,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#NroSolicitudes").html(data.length);
                var output = '<li data-role="list-divider">Solicitudes</li>';
                for (var i = 0; i < data.length; i++) {
                    output += '<li><a href="javascript:Solicitudes.Cerrar.RecuperarSolicitud(' + data[i].ID + ');">';
                    output += '<h2>' + data[i].Cliente + ' - ' + data[i].Sucursal + '</h2>';
                    output += '<p><strong>' + data[i].Equipo + ' - {' + data[i].NroSerie + '}-{' + data[i].NroInterno + '}</strong></p>';
                    output += '<p>' + data[i].Motivo + '</p>';
                    output += '<p class="ui-li-aside">' + data[i].FecSol + ' - ' + data[i].FecVen + '</p>';
                    output += '</a></li>';
                }
                $('#listSol > li').remove();
                $('#listSol').append(output).listview('refresh');
                $.mobile.loading("hide");
            }
        });
    },
    Cerrar: {
        RecuperarSolicitud: function (id) {
            $.mobile.loading("show", { text: "Recuperando Solicitud", textVisible: true, theme: "b", textonly: false, html: "" });
            Sol_ID = id;
            $("#cboTipoCierre").val("-1");
            $("#txtNumRep").val("");
            $("#txtFechaInicio").val(getFecha());
            $("#cboHoraInicial").val(getHora());
            $("#txtFechaFinal").val(getFecha());
            $("#cboHoraFinal").val(getHora());
            $("#txtObservaciones").val("");

            var exito = false;
            $.ajax({
                type: "POST",
                url: "http://eservice.rochembiocare.com/html5/rest/solicitudes.aspx/solicitud",
                data: "{ 'id':" + id + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    $("#lblFecApertura").val(data.d.FechaApertura);
                    $("#lblFecOntime").val(data.d.FechaOnTime);
                    $("#lblCliente").val(data.d.Cliente);
                    $("#lblSucursal").val(data.d.Sucursales);
                    $("#lblAnalizador").val(data.d.Equipo);
                    $("#txtSolicitud").val(data.d.Motivo);
                    $("#txtNumRep").val(data.d.NumeroReporte);
                    $.mobile.loading("hide");
                    $.mobile.changePage("#pagCloseSol", { transition: "none", reverse: false, changeHash: false });
                }
            });
        },
        Cerrar: function () {
            var exito = false;
            $.ajax({
                type: "POST",
                url: "http://eservice.rochembiocare.com/html5/rest/solicitudes.aspx/CerrarSolicitud",
                data: "{'id':'" + Sol_ID + "','FechaInicio':'" + $("#txtFechaInicio").val() + ' ' + $("#cboHoraInicial").val() + "','FechaCierre':'" + $("#txtFechaFinal").val() + ' ' + $("#cboHoraFinal").val() + "','NumeroReporte':'" + $("#txtNumeroReporte").val() + "','TipoCierre':'" + $("#txtNumRep").val() + "','UsuarioAtiende':'" + _user.ID + "','usr':'" + _user.login + "','Observaciones':'" + $("#txtObservaciones").val() + "', 'diferencia' : '" + diferencia + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.d.Exito) {
                        Solicitudes.Lista();
                    }
                    else {
                        //mensaje
                    }
                }
            });
        },
        ValidarFechas: function (envio) {
            $.ajax({
                type: "POST",
                url: "http://eservice.rochembiocare.com/html5/rest/solicitudes.aspx/ValidarFechaCierre",
                data: "{ 'fechaapertura':'" + $("#lblFecApertura").val() + "','fechainicio':'" + $("#txtFechaInicio").val() + ' ' + $("#cboHoraInicial").val() + "', 'fechacierre':'" + $("#txtFechaFinal").val() + ' ' + $("#cboHoraFinal").val() + "','usuario':'" + _user.login + "', 'diferencia':" + diferencia + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (!data.d.Exito) {
                        $("#error").text(data.d.Descripcion);
                        setTimeout(function () { $("#error").text(""); }, 2000);
                    }
                    else if (envio) {
                        Solicitudes.Cerrar.Cerrar();
                    }
                }
            });
        }
    },
    Nuevo:
        function () {
            DB.Execute("Select * from clientes where idPais = " + $("#cboPaisSol").val(), function (result) { ArmarSelect("#cboClienteSol", result, 0); });
            DB.Execute("Select * from sucursal where IDCLI = " + $("#cboClienteSol").val(), function (result) { ArmarSelect("#cboSucursalSol", result, 0); });
            DB.Execute("Select * from EQUIPOS where IDSUC = " + $("#cboSucursalSol").val(), function (result) { ArmarSelect("#cboEquipoSol", result, 0); });
            DB.Execute("Select * from TIPOSOLICITUD where idarea=" + $("#cboAreaSol").val(), function (result) { ArmarSelect("#cboTipoServicioSol", result, 0); });
            $("#txtMotivoSol").val('');
            $("#txtFecSol").val(getFechas());
            CboVal("#cboHoraSol", getHora());
            $("#txtClienteSolicita").val('');
            $("#txtEmailSol").val('');
        },
    Guardar: function () {
        $.mobile.loading("show", { text: "Guardando Reporte", textVisible: true, theme: "b", textonly: false, html: "" });
        var sol = new Solicitud();

        sol.id = "0";        
        sol.fecha = $("#txtFecSol").val() + " " + $("#cboHoraSol").val();;
        sol.TipoSolic = $("#cboTipoServicioSol").val();
        sol.pais = $("#cboPaisSol").val();
        sol.area = $("#cboAreaSol").val();
        sol.cliente = $("#cboClienteSol").val();
        sol.sucursal = $("#cboSucursalSol").val();
        sol.equipo = $("#cboEquipoSol").val();
        sol.motivo = $("#txtMotivoSol").val();
        sol.solicita = $("#txtClienteSolicita").val();
        sol.usuario = _user.ID;
        
        sol.email = $("#txtEmailSol").val();
        sol.user = _user.login;
        sol.diferencia = diferencia;

        $.ajax({
            type: "POST",
            url: "http://eservice.rochembiocare.com/html5/rest/solicitudes.aspx/GuardarSolicitud",
            data: JSON.stringify(sol),
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
    Validar: {
        FechaApertura: function (envio) {
            $.ajax({
                type: "POST",
                url: "http://eservice.rochembiocare.com/html5/rest/solicitudes.aspx/VerificarFecha",
                data: "{ fecha:'" + $("#txtFecSol").val() + "', hora:'" + $("#cboHoraSol").val() + "',usuario:'" + _user.login + "', 'diferencia' : '" + diferencia + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (!data.d.Exito) {
                        $("#errorSol").text(data.d.Descripcion);
                        setTimeout(function () { $("#errorSol").text(""); }, 2000);
                    }
                    else if (envio) {
                        Solicitudes.Guardar();
                    }
                }
            });
        }
}}
