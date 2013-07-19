var Menu = {
    Reportes: function () {
        $.mobile.changePage("#pagIngRep", {
            transition: "none",
            reverse: false,
            changeHash: false
        });
        Reportes.Nuevo();
    },
    ListaSolicitudes: function () {
        Solicitudes.Lista();
    },
    Sincronizar: function () {
        $.mobile.changePage("#pagSinc", {
            transition: "none",
            reverse: false,
            changeHash: false
        });
    },
    CerrarSesion: function () {
        $.mobile.changePage("#pagLogin", {
            transition: "none",
            reverse: false,
            changeHash: false
        });
        $("#password").val('');
    },
    Menu: function () {
        $.mobile.changePage("#pagMenu", {
            transition: "none",
            reverse: false,
            changeHash: false
        });
    }
}