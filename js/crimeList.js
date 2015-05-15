$(document).ready(function () {
    $.getJSON("js/json/crime.json", function (data) {
       for (var i = 0; i <data[0].comedia.length; i++) {
            var rating = countStars(data[0].comedia[i].rating);
            $(".main-holder").append('<article class="col-md-10 col-md-offset-1"><img class="show-img col-sm-5 img-responsive" src="img/posters/' + data[0].comedia[i].image + '" alt=""><div class="show-info col-sm-8  centralize"><h1 class="show-title">' +
                data[0].comedia[i].title + '</h1><span class="col-sm-11 col-sm-offset-1 rating-stars">'+ rating+'                    </span><ul class="more-info"><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + data[0].comedia[i].year + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + data[0].comedia[i].duration + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + data[0].comedia[i].channel + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + data[0].comedia[i].status + '</li></ul><div class="description"><p>' + data[0].comedia[i].description + '</p><p>Avaliado por <span class="users_number">X </span>usuários</p></div><a href="#" class="compare col-sm-10 col-sm-offset-1">Compare</a></div>         </article>');
        } /*End For*/

    });

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