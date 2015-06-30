$(document).ready(function(){
        
        pageLoader();

        function pageLoader() {
            var id = localStorage.getItem("id"); 
            $(".main-holder").html("");
            var dados = JSON.parse(localStorage.getItem('ActionDataBase'));
            var rating = countStars(dados.acao[id].rating);
            $("title").append(dados.acao[id].title);
            $(".main-holder").append('<article itemscope itemtype="http://schema.org/TVSeries" class="col-md-12"><img class="show-img col-sm-4 img-responsive" src="' + dados.acao[id].image + '" alt=""><div class="show-info col-sm-6  centralize"><h1 class="show-title"><span itemprop="name">' +
                dados.acao[id].title + '</span></h1><span class="col-sm-11 col-sm-offset-1 rating-stars">' + rating + '</span><ul class="more-info"><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span> <span itemprop="startDate">' + dados.acao[id].year + '</span></li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + dados.acao[id].duration + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span> <span itemprop="productionCompany">' + dados.acao[id].channel + '</span></li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + dados.acao[id].status + '</li></ul><div class="description"><p><span itemprop="about">' + dados.acao[id].description + '</span></p><p>Avaliado por <span class="users_number">X </span>usuários</p></div></div>         </article>');
            for(var i=0;i<dados.acao[id].comments.length;i++)
                $(".comments").append('<div class="comment"><p>Autor: '+ dados.acao[id].comments[i].author +'</p><p><span itemprop="comment">'+dados.acao[id].comments[i].comment+'</span></p></div>');
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


$(function () {
    var linksContainer = $('#links');
    var id = localStorage.getItem("id"); 
    var dados = JSON.parse(localStorage.getItem('ActionDataBase'));
    for(var i=0;i<dados.acao[id].gallery.length;i++){
        $('<a/>')
            .append($('<img class="small_image">').prop('src',dados.acao[id].gallery[i]))
            .prop('href', dados.acao[id].gallery[i])
            .prop('title', dados.acao[id].title)
            .attr('data-gallery', '')
            .appendTo(linksContainer);
    }   
    $('#borderless-checkbox').on('change', function () {
        var borderless = $(this).is(':checked');
        $('#blueimp-gallery').data('useBootstrapModal', !borderless);
        $('#blueimp-gallery').toggleClass('blueimp-gallery-controls', borderless);
    });

    $('#fullscreen-checkbox').on('change', function () {
        $('#blueimp-gallery').data('fullScreen', $(this).is(':checked'));
    });

    $('#image-gallery-button').on('click', function (event) {
        event.preventDefault();
        blueimp.Gallery($('#links a'), $('#blueimp-gallery').data());
    });

    $('#video-gallery-button').on('click', function (event) {
        event.preventDefault();
        blueimp.Gallery([
            {
                title: 'Sintel',
                href: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
                type: 'video/mp4',
                poster: 'http://media.w3.org/2010/05/sintel/poster.png'
            },
            {
                title: 'Big Buck Bunny',
                href: 'http://upload.wikimedia.org/wikipedia/commons/7/75/' +
                    'Big_Buck_Bunny_Trailer_400p.ogg',
                type: 'video/ogg',
                poster: 'http://upload.wikimedia.org/wikipedia/commons/thumb/7/70/' +
                    'Big.Buck.Bunny.-.Opening.Screen.png/' +
                    '800px-Big.Buck.Bunny.-.Opening.Screen.png'
            },
            {
                title: 'Elephants Dream',
                href: 'http://upload.wikimedia.org/wikipedia/commons/transcoded/8/83/' +
                    'Elephants_Dream_%28high_quality%29.ogv/' +
                    'Elephants_Dream_%28high_quality%29.ogv.360p.webm',
                type: 'video/webm',
                poster: 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/90/' +
                    'Elephants_Dream_s1_proog.jpg/800px-Elephants_Dream_s1_proog.jpg'
            },
            {
                title: 'LES TWINS - An Industry Ahead',
                href: 'http://www.youtube.com/watch?v=zi4CIXpx7Bg',
                type: 'text/html',
                youtube: 'zi4CIXpx7Bg',
                poster: 'http://img.youtube.com/vi/zi4CIXpx7Bg/0.jpg'
            },
            {
                title: 'KN1GHT - Last Moon',
                href: 'http://vimeo.com/73686146',
                type: 'text/html',
                vimeo: '73686146',
                poster: 'http://b.vimeocdn.com/ts/448/835/448835699_960.jpg'
            }
        ], $('#blueimp-gallery').data());
    });

});

function writeComment(){
    var comment = document.getElementById("comment").value;
    var author =  document.getElementById("name").value;
    var dados = JSON.parse(localStorage.getItem('ActionDataBase'));
    var id = localStorage.getItem("id"); 
    var newComment = {
        "author" : author,
        "comment" : comment
    }
    dados.acao[id].comments.push(newComment);
    localStorage.setItem('ActionDataBase',JSON.stringify(dados));
    location.reload();
}