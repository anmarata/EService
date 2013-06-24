var Sinc = {
    Permisos: function (control) {
        $.ajax({
            type: "POST",
            url: "../rest/Catalogos.ashx?c=P",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var cont = 0;
                DB.Execute("delete from PERMISOS;", function (results) { }, []);
                for (var i = 0; i < data.length; i++) {
                    DB.Execute("insert into PERMISOS(ID, VALOR) VALUES('" + data[i].perd_clave + "','" + data[i].perd_valor + "');",
                        function (results) {
                            cont++;
                            var t = (cont * 100) / data.length + " %";
                            $(control).html(t);
                        }, []);
                }
            }
        });
    },
    Clientes: function (control) {
        $.ajax({
            type: "POST",
            url: "../rest/Catalogos.ashx?c=C",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var cont = 0;
                DB.Execute("delete from CLIENTES;", function (results) { }, []);
                for (var i = 0; i < data.length; i++) {
                    DB.Execute("insert into CLIENTES(ID, DESCRIPCION) VALUES('" + data[i].cl_id + "','" + data[i].cl_nombre + "');",
                        function (results) {
                            cont++;
                            var t = (cont * 100) / data.length + " %";
                            $(control).html(t);
                        }, []);
                }
            }
        });
    },
    Sucursales: function (control) {
        $.ajax({
            type: "POST",
            url: "../rest/Catalogos.ashx?c=S",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var cont = 0;
                DB.Execute("delete from SUCURSAL;", function (results) { });
                for (var i = 0; i < data.length; i++) {
                    DB.Execute("insert into SUCURSAL(ID, DESCRIPCION, IDCLI) VALUES('" + data[i].cd_id + "','" + data[i].cd_nombre + "','" + data[i].cd_cli_id + "');",
                        function (results) {
                            cont++;
                            var t = (cont * 100) / data.length + " %";
                            $(control).html(t);
                        });
                }
            }
        });
    },
    Equipos: function (control) {
        $.ajax({
            type: "POST",
            url: "../rest/Catalogos.ashx?c=E",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var cont = 0;
                DB.Execute("delete from EQUIPOS;", function (results) { }, []);
                for (var i = 0; i < data.length; i++) {
                    DB.Execute("insert into EQUIPOS(ID, DESCRIPCION, IDSUC) VALUES('" + data[i].a_id + "','" + data[i].a_descrip + "','" + data[i].m_clidet_id + "');",
                        function (results) {
                            cont++;
                            var t = (cont * 100) / data.length + " %";
                            $(control).html(t);
                        }, []);
                }
            }
        });
    },
    TipoSolicitud: function (control) {
        $.ajax({
            type: "POST",
            url: "../rest/Catalogos.ashx?c=TS",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var cont = 0;
                DB.Execute("delete from TIPOSOLICITUD;", function (results) { }, []);
                for (var i = 0; i < data.length; i++) {

                    DB.Execute("insert into TIPOSOLICITUD(ID, DESCRIPCION,IDAREA) VALUES('" + data[i].ts_id + "','" + data[i].ts_descrip + "','');",
                        function (results) {
                            cont++;
                            var t = (cont * 100) / data.length + " %";
                            $(control).html(t);
                        }, []);
                }
            }
        });
    },
    Version: {
        InsertarValores: function (control) {
            $.ajax({
                type: "POST",
                url: "../rest/Catalogos.ashx?c=V",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    var cont = 0;
                    DB.Execute("delete from VERSION;", function (results) { }, []);
                    for (var i = 0; i < data.length; i++) {
                        DB.Execute("insert into VERSION(NVERSION, CATALOGO) VALUES('" + data[i].v_version + "','" + data[i].v_catalogo + "');",
                            function (results) {
                                cont++;
                                var t = (cont * 100) / data.length + " %";
                                $(control).html(t);
                            }, []);
                    }
                }
            });
        },
        Actualizar: function (id, version) {
            DB.Execute("UPDATE version SET nversion = " + version + " where id = " + id + " ; ", function (results) { }, []);
        }
    },
    Actializar: function (result) {
        function r()
        {
            Sinc.Version.InsertarValores('');
            Sinc.Permisos('#spanPermisos');
            Sinc.Clientes('#spanClientes');
            Sinc.Sucursales('#spanSucursal');
            Sinc.Equipos('#spanEquipos');
            Sinc.TipoSolicitud('#spanTipoSolicitud');
        }
        if (result == undefined)
        { r(); }
        else {
            if (result.rows.length == 0) {
                r();
            }
            else {
                $.ajax({
                    type: "POST",
                    url: "../rest/Catalogos.ashx?c=V",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0; j < result.rows.length; j++) {
                                if (data[i].v_catalogo == result.rows.item(j).CATALOGO) {
                                    if (data[i].v_version == result.rows.item(j).NVERSION) {
                                        switch (result.rows.item(j).CATALOGO) {
                                            case "Permisos": $('#spanPermisos').html("Versión: " + result.rows.item(j).NVERSION); break;
                                            case "Clientes": $('#spanClientes').html("Versión: " + result.rows.item(j).NVERSION); break;
                                            case "Sucursales": $('#spanSucursal').html("Versión: " + result.rows.item(j).NVERSION); break;
                                            case "Equipos": $('#spanEquipos').html("Versión: " + result.rows.item(j).NVERSION); break;
                                            case "TipoSolicitud": $('#spanTipoSolicitud').html("Versión: " + result.rows.item(j).NVERSION); break;
                                        }
                                    }
                                    else {
                                        switch (result.rows.item(j).CATALOGO) {
                                            case "Permisos": Sinc.Permisos('#spanPermisos'); Sinc.Version.Actualizar(result.rows.item(j).ID, data[i].v_version); break;
                                            case "Clientes": Sinc.Clientes('#spanClientes'); Sinc.Version.Actualizar(result.rows.item(j).ID, data[i].v_version); break;
                                            case "Sucursales": Sinc.Sucursales('#spanSucursal'); Sinc.Version.Actualizar(result.rows.item(j).ID, data[i].v_version); break;
                                            case "Equipos": Sinc.Equipos('#spanEquipos'); Sinc.Version.Actualizar(result.rows.item(j).ID, data[i].v_version); break;
                                            case "TipoSolicitud": Sinc.TipoSolicitud('#spanTipoSolicitud'); Sinc.Version.Actualizar(result.rows.item(j).ID, data[i].v_version); break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    }
}