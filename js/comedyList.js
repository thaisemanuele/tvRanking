$(document).ready(function () {
    
    pageLoader();

     $("#sortSelection").change(function () {
        pageLoader();
    });

    
    function pageLoader() {
        $(".main-holder").html("");
        var dados = JSON.parse(localStorage.getItem('ComedyDataBase'));
        for (var i = 0; i < dados.comedia.length; i++) {
                sortData(dados);
                var rating = countStars(dados.comedia[i].rating);
                $(".main-holder").append('<article class="col-md-10 col-md-offset-1"><img class="show-img col-sm-5 img-responsive" src="' 
                    + dados.comedia[i].image + '" alt=""><div class="show-info col-sm-8  centralize"><h1 class="show-title"> <a href="" id="'
                    + dados.comedia[i].id +'">' + dados.comedia[i].title + '</a></h1><span class="col-sm-11 col-sm-offset-1 rating-stars">' 
                    + rating + '</span><ul class="more-info"><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' 
                    + dados.comedia[i].year + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' 
                    + dados.comedia[i].duration + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' 
                    + dados.comedia[i].channel + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' 
                    + dados.comedia[i].status + '</li></ul><div class="description"><p>' + dados.comedia[i].description 
                    + '</p><p>Avaliado por <span class="users_number">'+ dados.comedia[i].reviews +'</span>usuários</p></div><a href="#" id="compare'+i
                    +'" class="compare col-sm-10 col-sm-offset-1">Compare</a></div> </article>');
            } /*End For*/
        for(var i = 0; i < dados.comedia.length; i++) /*Deixa clicar em quaquer dos titulos*/
            document.getElementById(i).addEventListener("click", function(event){
                localStorage.setItem("id", event.target.id);
                window.open("serie_comedia.html");
            });
        for (var i = 0; i < dados.comedia.length; i++)
            compareListener(i);
    }

    function compareListener(i) {
        document.getElementById("compare"+i).addEventListener("click", function(event){
            localStorage.setItem("compare", i);
            window.open("comediaCompare.html");
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
            data.comedia.sort(SortByName);
        } else if ($("#sortSelection").val() === "year") {
            data.comedia.sort(SortByYear);
        } else if ($("#sortSelection").val() === "rating") {
            data.comedia.sort(SortByRating);
        } else if ($("#sortSelection").val() === "duration") {
            data.comedia.sort(SortByDuration);
        } else if ($("#sortSelection").val() === "returning") {
            data.comedia.sort(SortByReturning);
        } else if ($("#sortSelection").val() === "ended") {
            data.comedia.sort(SortByEnded);
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
        bDur = bDur.split(" ");
        return ((aDur[0] < bDur[0]) ? -1 : ((aDur[0] > bDur[0]) ? 1 : 0));
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