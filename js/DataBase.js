var databaseOptions = {
    fileName: "EService_database",
    version: "1.0",
    displayName: "Eservice DataBase",
    maxSize: 1024
};
var database = openDatabase(
            databaseOptions.fileName,
            databaseOptions.version,
            databaseOptions.displayName,
            databaseOptions.maxSize
        );

var DB = {
    CrearTablas: function () {
        database.transaction(
                function (transaction) {
                    //VERSION
                    transaction.executeSql("CREATE TABLE IF NOT EXISTS VERSION (ID INTEGER PRIMARY KEY AUTOINCREMENT, CATALOGO VARCHAR(50) NOT NULL, NVERSION INTEGER NOT NULL);");
                    //CLIENTES
                    transaction.executeSql("CREATE TABLE IF NOT EXISTS CLIENTES (ID INTEGER NOT NULL, DESCRIPCION TEXT NOT NULL, IDPAIS INTEGER NOT NULL);");
                    //SUCURSALES
                    transaction.executeSql("CREATE TABLE IF NOT EXISTS SUCURSAL (ID INTEGER NOT NULL, DESCRIPCION TEXT NOT NULL, IDCLI INTEGER NOT NULL);");
                    //EQUIPOS
                    transaction.executeSql("CREATE TABLE IF NOT EXISTS EQUIPOS  (ID INTEGER NOT NULL, DESCRIPCION TEXT NOT NULL, IDSUC INTEGER NOT NULL);");
                    //TIPOS SOLICITUD
                    transaction.executeSql("CREATE TABLE IF NOT EXISTS TIPOSOLICITUD  (ID INTEGER NOT NULL, DESCRIPCION TEXT NOT NULL, IDAREA INTEGER NOT NULL);");
                    //PERMISOS
                    transaction.executeSql("CREATE TABLE IF NOT EXISTS PERMISOS  (ID TEXT NOT NULL, VALOR TEXT NOT NULL);");
                });
    },
    Execute: function (sql, callback, parameters) {
        database.transaction(
            function (transaction) {
                transaction.executeSql(sql, parameters,
                    function (transaction, results) {
                        callback(results);
                    },
                    function (transaction, error) {
                        alert(error.message);
                    }
                );
            });
    },
};