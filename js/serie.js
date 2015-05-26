$(document).ready(function(){
        
        pageLoader();

        function pageLoader() {
            var id = localStorage.getItem("id"); 
            $(".main-holder").html("");
            $.ajaxSetup({ mimeType: "text/plain" });
            $.getJSON("js/json/acao.json", function (data) {
                var rating = countStars(data[0].acao[id].rating);
                $(".main-holder").append('<article class="col-md-12"><img class="show-img col-sm-4 img-responsive" src="img/posters/' + data[0].acao[id].image + '" alt=""><div class="show-info col-sm-6  centralize"><h1 class="show-title">' +
                    data[0].acao[id].title + '</h1><span class="col-sm-11 col-sm-offset-1 rating-stars">' + rating + '                    </span><ul class="more-info"><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + data[0].acao[id].year + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + data[0].acao[id].duration + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + data[0].acao[id].channel + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + data[0].acao[id].status + '</li></ul><div class="description"><p>' + data[0].acao[id].description + '</p><p>Avaliado por <span class="users_number">X </span>usuários</p></div></div>         </article>');
                for(var i=0;i<data[0].acao[id].comments.length;i++)
                   $(".comments").append('<div class="comment"><p>Autor: '+ data[0].acao[id].comments[i].author +'</p><p>'+data[0].acao[id].comments[i].comment+'</p></div>')
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