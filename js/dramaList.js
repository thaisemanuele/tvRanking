$(document).ready(function () {


    pageLoader();


    $("#sortSelection").change(function() {
       alert("status changed");
        pageLoader();
    });

    function pageLoader() {
        $(".main-holder").html("");
        $.getJSON("js/json/drama.json", function (data) {
            alert("calling sort");
            sortData(data);
            for (var i = 0; i < data[0].drama.length; i++) {
                var rating = countStars(data[0].drama[i].rating);
                $(".main-holder").append('<article class="col-md-10 col-md-offset-1"><img class="show-img col-sm-5 img-responsive" src="img/posters/' + data[0].drama[i].image + '" alt=""><div class="show-info col-sm-8  centralize"><h1 class="show-title">' +
                    data[0].drama[i].title + '</h1><span class="col-sm-11 col-sm-offset-1 rating-stars">' + rating + '                    </span><ul class="more-info"><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + data[0].drama[i].year + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + data[0].drama[i].duration + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + data[0].drama[i].channel + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + data[0].drama[i].status + '</li></ul><div class="description"><p>' + data[0].drama[i].description + '</p><p>Avaliado por <span class="users_number">X </span>usuários</p></div><a href="#" class="compare col-sm-10 col-sm-offset-1">Compare</a></div>         </article>');
            } /*End For*/

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
            data[0].drama.sort(SortByName);
        } else if ($("#sortSelection").val() === "year") {
            data[0].drama.sort(SortByYear);
        }
        return data;
    }

    function SortByName(a, b) {
        var aTitle = a.title.toLowerCase();
        var bTitle = b.title.toLowerCase();
        return ((aTitle < bTitle) ? -1 : ((aTitle > bTitle) ? 1 : 0));
    }

    function SortByYear(a, b) {
                       alert("by year");

        var aYear = a.year;
        var bYear = b.year;
        return ((aYear < bYear) ? -1 : ((aYear > bYear) ? 1 : 0));
    }

});