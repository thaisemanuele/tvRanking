$(document).ready(function () {


    pageLoader();


    $("#sortSelection").change(function () {
        pageLoader();
    });

    function pageLoader() {
        $(".main-holder").html("");
        var dados = JSON.parse(localStorage.getItem('DramaDataBase'));
        sortData(dados);
        for (var i = 0; i < dados.drama.length; i++) {
            var rating = countStars(dados.drama[i].rating);
            $(".main-holder").append('<article class="col-md-10 col-md-offset-1"><img class="show-img col-sm-5 img-responsive" src="' + dados.drama[i].image + '" alt=""><div class="show-info col-sm-8  centralize"><h1 class="show-title"> <a href="" id="'+ dados.drama[i].id +'">' +
                dados.drama[i].title + '</a></h1><span class="col-sm-11 col-sm-offset-1 rating-stars">' + rating + '                    </span><ul class="more-info"><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + dados.drama[i].year + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + dados.drama[i].duration + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + dados.drama[i].channel + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + dados.drama[i].status + '</li></ul><div class="description"><p>' + dados.drama[i].description + '</p><p>Avaliado por <span class="users_number">X </span>usuários</p></div><a href="#" class="compare col-sm-10 col-sm-offset-1">Compare</a></div>         </article>');
        } /*End For*/
        for(var i = 0; i < dados.drama.length; i++) /*Deixa clicar em quaquer dos titulos*/
            document.getElementById(i).addEventListener("click", function(event){
                localStorage.setItem("id", event.target.id);
                window.open("serie_drama.html");
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

    function sortData(data) {

        if ($("#sortSelection").val() === "alfa") {
            data.drama.sort(SortByName);
        } else if ($("#sortSelection").val() === "year") {
            data.drama.sort(SortByYear);
        } else if ($("#sortSelection").val() === "rating") {
            data.drama.sort(SortByRating);
        } else if ($("#sortSelection").val() === "duration") {
            data.drama.sort(SortByDuration);
        } else if ($("#sortSelection").val() === "returning") {
            data.drama.sort(SortByReturning);
        } else if ($("#sortSelection").val() === "ended") {
            data.drama.sort(SortByEnded);
        }
        return data;
    }

    function SortByName(a, b) {
        var aTitle = a.title.toLowerCase();
        var bTitle = b.title.toLowerCase();
        return ((aTitle < bTitle) ? -1 : ((aTitle > bTitle) ? 1 : 0));
    }

    function SortByYear(a, b) {
        var aYear = a.year;
        var bYear = b.year;
        return ((aYear < bYear) ? -1 : ((aYear > bYear) ? 1 : 0));
    }

    function SortByRating(a, b) {
        var aRating = a.rating;
        var bRating = b.rating;
        return ((aRating > bRating) ? -1 : ((aRating < bRating) ? 1 : 0));
    }

    function SortByDuration(a, b) {
        var aDur = a.duration;
        var bDur = b.duration;
        aDur = aDur.split(" ");
        return ((aDur < bDur) ? -1 : ((aDur > bDur) ? 1 : 0));
    }
    
    function SortByReturning(a, b) {
        var aStatus = a.status;
        var bStatus = b.status;
        return ((aStatus < bStatus) ? -1 : ((aStatus > bStatus) ? 1 : 0));
    }
    
    function SortByEnded(a, b) {
        var aStatus = a.status;
        var bStatus = b.status;
        return ((aStatus > bStatus) ? -1 : ((aStatus < bStatus) ? 1 : 0));
    }

});