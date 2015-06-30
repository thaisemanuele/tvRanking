
$(document).ready(function(){

    pageLoader();

    function pageLoader() {
        $("#lastUpdated").html("");
        
        // Ultima atualizacao em acao
        var dados = JSON.parse(localStorage.getItem('ActionDataBase'));
        var last = dados.acao.length - 1;
        var rating = countStars(dados.acao[last].rating);
        $("#lastUpdated").append('<article class="col-md-5"><img class="show-img col-sm-5 img-responsive" src="' + dados.acao[last].image +'" alt="">\
                                    <div class="show-info col-sm-7 col-sm-offset-1 centralize"><h1 class="show-title"><a href="" id="actionLast">' + dados.acao[last].title +'</a></h1>\
                                    <span class="col-sm-11 col-sm-offset-1 rating-stars">' + rating +'</span>\
                                    <div class="row genre-year"> <span class="col-sm-3 col-sm-offset-2 centralized">Ação</span><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>\
                                    <span class="col-sm-3 centralized">'+dados.acao[last].year +'</span> </div>\
                                    <a id="compareAction" href="" class="compare col-sm-10 col-sm-offset-1">Compare</a> </div>\
                                    </article>\
        ');
        document.getElementById("actionLast").addEventListener("click", function(event){
            localStorage.setItem("id", last);
            window.open("serie_acao.html");
        });

        document.getElementById("compareAction").addEventListener("click", function(event){
            localStorage.setItem("compare", last);
            window.open("acaoCompare.html");
        });

        //ultima atualizacao em comedia
        var dados = JSON.parse(localStorage.getItem('ComedyDataBase'));
        var last = dados.comedia.length - 1;
        var rating = countStars(dados.comedia[last].rating);
        $("#lastUpdated").append('<article class="col-md-5 col-md-offset-1"> <img class="show-img col-sm-5 img-responsive" src="' + dados.comedia[last].image +'" alt="">\
                                <div class="show-info col-sm-7 col-sm-offset-1 centralize"> <h1 class="show-title"><a href="" id="comedyLast">' + dados.comedia[last].title +'</a></h1>\
                                <span class="col-sm-11 col-sm-offset-1 rating-stars">' +rating +'</span> <div class="row genre-year">\
                                <span class="col-sm-3 col-sm-offset-1 centralized">Comédia</span>\
                                <span class="glyphicon glyphicon-star col-sm-1 col-sm-offset-1" aria-hidden="true"></span>\
                                <span class="col-sm-3 col-sm-offset-1">' + dados.comedia[last].year+'</span> </div>\
                                <a id="compareComedy" href="" class="compare col-sm-10 col-sm-offset-1">Compare</a> </div>\
                                </article>\
        ');
        document.getElementById("comedyLast").addEventListener("click", function(event){
            localStorage.setItem("id", last);
            window.open("serie_comedia.html");
        });
        document.getElementById("compareComedy").addEventListener("click", function(event){
            localStorage.setItem("compare", last);
            window.open("comediaCompare.html");
        });

        //ultima atualizacao em crime
        var dados = JSON.parse(localStorage.getItem('CrimeDataBase'));
        var last = dados.crime.length - 1;
        var rating = countStars(dados.crime[last].rating);
        $("#lastUpdated2").append('<article class="col-md-5"> <img class="show-img col-sm-5 img-responsive" src="'+ dados.crime[last].image +'" alt="">\
                                <div class="show-info col-sm-7 col-sm-offset-1 centralize"> <h1 class="show-title"> <a id="crimeLast" href="">'+ dados.crime[last].title +'</a></h1>\
                                <span class="col-sm-11 col-sm-offset-1 rating-stars"> '+ rating +'</span>\
                                <div class="row genre-year"> <span class="col-sm-3 col-sm-offset-2 centralized">Crime</span>\
                                <span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span><span class="col-sm-3 centralized">'+ dados.crime[last].year+'</span>\
                                </div><a id="compareCrime" href="" class="compare col-sm-10 col-sm-offset-1">Compare</a></div>\
                                </article>\
        ');
        document.getElementById("crimeLast").addEventListener("click", function(event){
            localStorage.setItem("id", last);
            window.open("serie_crime.html");
        });
        document.getElementById("compareCrime").addEventListener("click", function(event){
            localStorage.setItem("compare", last);
            window.open("crimeCompare.html");
        });

        //ultima atualizacao em drama
        var dados = JSON.parse(localStorage.getItem('DramaDataBase'));
        var last = dados.drama.length - 1;
        var rating = countStars(dados.drama[last].rating);
        $("#lastUpdated2").append('<article class="col-md-5 col-md-offset-1"><img class="show-img col-sm-5 img-responsive" src="' + dados.drama[last].image + '" alt="">\
                                    <div class="show-info col-sm-7 col-sm-offset-1 centralize"> <h1 class="show-title"><a href="" id="dramaLast">' + dados.drama[last].title + '</a></h1>\
                                    <span class="col-sm-11 col-sm-offset-1 rating-stars">' + rating + '</span> <div class="row genre-year">\
                                    <span class="col-sm-3 col-sm-offset-1 centralized">Drama</span>\
                                    <span class="glyphicon glyphicon-star col-sm-1 col-sm-offset-1" aria-hidden="true"></span>\
                                    <span class="col-sm-3 col-sm-offset-1">' + dados.drama[last].year + '</span></div>\
                                    <a id="compareDrama" href="" class="compare col-sm-10 col-sm-offset-1">Compare</a> </div>\
                                    </article>\
        ');
        document.getElementById("dramaLast").addEventListener("click", function(event){
            localStorage.setItem("id", last);
            window.open("serie_drama.html");
        });
        document.getElementById("compareDrama").addEventListener("click", function(event){
            localStorage.setItem("compare", last);
            window.open("dramaCompare.html");
        });

    }
    function countStars(rating) {
        var stars = "";
        for (var i = 1; i < 6; i++) {
            if (rating >= i) {
                stars = stars + '<img src="img/rating_star.png" alt="uma estrela">';
            } else if (rating > i - 1) {
                stars = stars + '<img src="img/half_star.png" alt="meia estrela">';
            } else {
                stars = stars + '<img src="img/rating_star_gray.png" alt="zero estrela">';
            }
        }
        return stars;
    }
});