function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
function getHora()
{
    var t = new Date();
    var h = ("0" + t.getHours()).slice(-2) + ":";

    if (t.getMinutes() >= 0 && t.getMinutes() < 15)
        h += "00";
    else if (t.getMinutes() >= 15 && t.getMinutes() < 30)
        h += "15";
    else if (t.getMinutes() >= 30 && t.getMinutes() < 45)
        h += "30";
    else
        h += "45";
    return h;
}
function getFecha()
{
    var d = new Date();
    return [("0" + d.getDate()).slice(-2), ("0" + (d.getMonth() + 1)).slice(-2), d.getFullYear()].join('/');
}
function getFechas() {
    var d = new Date();
    return [d.getFullYear(), ("0" + (d.getMonth() + 1)).slice(-2), ("0" + d.getDate()).slice(-2)].join('-');
}
function ArmarSelect(idcontrol, result, id) {
    $(idcontrol).empty();
    if (id == 0) {
        $(idcontrol).append('<option value="0" selected>Seleccione Item</option>');
    }
    for (var i = 0; i < result.rows.length; i++) {
        if (id != result.rows.item(i).ID) { $(idcontrol).append('<option value="' + result.rows.item(i).ID + '">' + result.rows.item(i).DESCRIPCION + '</option>'); }
        else { $(idcontrol).append('<option value="' + result.rows.item(i).ID + '" selected>' + result.rows.item(i).DESCRIPCION + '</option>'); }
    }
    
    $(idcontrol).selectmenu("refresh", true);
}
function CboVal(control, valor)
{
    $(control).val(valor);
    $(control).selectmenu("refresh", true);
}