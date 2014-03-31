var Menu = {
    Solicitudes: function () {
        $.mobile.changePage("#pagIngSol", {
            transition: "none",
            reverse: false,
            changeHash: false
        });
        Solicitudes.Nuevo();
    },
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
        localStorage.user = undefined;
        $.mobile.changePage("#pagLogin", {
            transition: "none",
            reverse: false,
            changeHash: false
        });
        $("#password").val('');
    },
    Atras: function () {
        if ($.mobile.activePage.attr('id') == 'pagListSol') {
            navigator.app.exitApp();
        } else {
            $.mobile.changePage('#pagListSol');
        } 
    },
    Menu: function () {
        $.mobile.changePage("#pagMenu", {
            transition: "none",
            reverse: false,
            changeHash: false
        });
    }
}