// Verifica se os dados ja estao na seesao, caso contrario,
// carrega todo os dados que ja se encontram em JSON para a sessao
$(document).ready(function(){

if(localStorage.getItem('ActionDataBase') == null){
    $.ajaxSetup({ mimeType: "text/plain" });
    $.getJSON("js/json/acao.json", function (data) {
        localStorage.setItem('ActionDataBase',JSON.stringify(data[0]));
    });
}

if(localStorage.getItem('DramaDataBase') == null){
    $.ajaxSetup({ mimeType: "text/plain" });
    $.getJSON("js/json/drama.json", function (data) {
        localStorage.setItem('DramaDataBase',JSON.stringify(data[0]));
    });
}

if(localStorage.getItem('ComedyDataBase') == null){
    $.ajaxSetup({ mimeType: "text/plain" });
    $.getJSON("js/json/comedia.json", function (data) {
        localStorage.setItem('ComedyDataBase',JSON.stringify(data[0]));
    });
}

if(localStorage.getItem('CrimeDataBase') == null){
    $.ajaxSetup({ mimeType: "text/plain" });
    $.getJSON("js/json/crime.json", function (data) {
        localStorage.setItem('CrimeDataBase',JSON.stringify(data[0]));
    });
}

if(localStorage.getItem('UsersDataBase') == null){
    $.ajaxSetup({ mimeType: "text/plain" });
    $.getJSON("js/json/users.json", function (data) {
        localStorage.setItem('UsersDataBase',JSON.stringify(data));
    });
}

loadIndex();

});