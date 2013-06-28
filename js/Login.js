var _user = new Usuario();
function Usuario() {
    this.login = "";
    this.ID = 0;
    this.Permisos = "";
}
var Login = {
   

    Validar: function () {
        $.mobile.loading("show", {
            text: "Verificando Usuario",
            textVisible: true,
            theme: "b",
            textonly: false,
            html: ""
        });
        $.ajax({
            type: "GET",
            url: "http://eservice.rochembiocare.com/rest/Login.ashx?u=" + user.value + "&p=" + password.value,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                _user.login = user.value;
                
                Login.IniciarSesion(data);
                $.mobile.loading("hide");
            }
        });
    },
    IniciarSesion: function (data) {
        if (data.respuesta.Exito) {
            _user.ID = data.respuesta.Descripcion;
            _user.Permisos = data.permisos;
            $.mobile.changePage("#pagSinc", {
                transition: "none",
                reverse: false,
                changeHash: false
            });



            DB.Execute("select * from version;", Sinc.Actializar);
        }
        else {
            _user.ID = 0;
            _user.login = "";
            $("#errLogin").css("display", "");
            $("#errLogin span.ui-btn-text").html(data.respuesta.Descripcion);
        }
    }
}