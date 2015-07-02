$(document).ready(function(){
        
        var dados = JSON.parse(localStorage.getItem('DramaDataBase'));
        var id = localStorage.getItem("id");         
        pageLoader();

        function pageLoader() {
            $(".main-holder").html("");
            var rating = countStars(dados.drama[id].rating);
            var starring = findActors(id);
            $("title").append(dados.drama[id].title);
            $(".main-holder").append('<article itemscope itemtype="http://schema.org/TVSeries" class="col-md-12"><img class="show-img col-sm-4 img-responsive" src="' 
                + dados.drama[id].image + '" alt=" poster da serie'
                +dados.drama[id].title+'"><div class="show-info col-sm-6  centralize"><h1 class="show-title"><span itemprop="name" lang="en">' 
                +dados.drama[id].title 
                + '</span></h1><span class="col-sm-11 col-sm-offset-1 rating-stars">' + rating 
                + '</span><ul class="more-info"><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span><span itemprop="startDate">' 
                + dados.drama[id].year + '</span></li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' 
                + dados.drama[id].duration + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span><span itemprop="productionCompany">' 
                + dados.drama[id].channel + '</span></li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' 
                + dados.drama[id].status + '</li></ul><div class="description"><p><span itemprop="about">' + dados.drama[id].description 
                + '</span></p><p>Diretor:<span itemprop="director"> '+dados.drama[id].director+'</span></p><h2>Estrelando</h2><p><ul id="starring">'+starring
                +'</ul></p><p>Numero de Episodios:<span itemprop="numberOfEpisodes"> '+dados.drama[id].noEpisodes
                +'</span></p><p>Numero de Temporadas:<span itemprop="numberOfseasons"> '+dados.drama[id].noSeasons
                +'</span></p><p>Avaliado por <span class="users_number">'+dados.drama[id].reviews
                +' </span>usuários</p></div></div><p class="show-info col-sm-6">Avalie essa série também:</p><form class="col-sm-6 starStyle"><input id="input-2c" class="rating" min="0" max="5" step="0.5" data-size="sm" data-symbol="&#xf005;" data-glyphicon="false" data-rating-class="rating-fa" value="0"></form></article>');
            if(dados.drama[id].trailer == null){
                $("#trailer").append('<p>Não há trailer para essa série.</p>');
            }
            else
                $("#trailer").append('<iframe itemprop="trailer" width="420" height="315" src="'+dados.drama[id].trailer
                +'" frameborder="0" allowfullscreen"></iframe>');
            if(dados.drama[id].comments.length == 0)
                $(".comments").append('<p>Não há comentários para essa série ainda.</p>');
            else
                for(var i=0;i<dados.drama[id].comments.length;i++)
                $(".comments").append('<div class="comment"><p>Autor: '+ dados.drama[id].comments[i].author +'</p><p><span itemprop="comment">'+dados.drama[id].comments[i].comment+'</span></p></div>');
            if(dados.drama[id].gallery.length == 0)
                $("#links").append('<p>Não há imagens cadastradas para essa série.</p>');
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
    
     function findActors(id) {
        var starring = "";
        for (var i = 0; i < dados.drama[id].starring.length; i++) {
            
            starring = starring + '<li class="actors" itemprop="actor">'+dados.drama[id].starring[i]+'</li>';
        } 
        return starring;
    }

    $('#input-2c').on('rating.change', function(event, value, caption) {
        if(localStorage.getItem("logged")==null){
            alert("Você deve estar logado para avaliar uma série");
            return;
        }
        dados.drama[id].reviews++;
        dados.drama[id].rating = (parseFloat(dados.drama[id].rating) + parseFloat(value)) / dados.drama[id].reviews
        console.log(dados.drama[id].rating);
        $('#input-2c').rating('destroy');
        localStorage.setItem('DramaDataBase',JSON.stringify(dados));
    });


    if(localStorage.getItem("logged")==1)
        $(".commentBox").append('\
                <h4>Deixe um comentário abaixo sobre essa série:</h4>\
                <form class="form-horizontal">\
                    <div class="form-group">\
                        <label for="name" class="col-sm-2 control-label">Nome Completo</label>\
                        <input id="name" type="text" class="col-sm-2 form-control"/>\
                    </div>\
                </form>\
                <textarea id="comment"class= "form-horizontal col-sm-offset-2" rows="6" cols="60" required="required">Escreva seu comentário aqui.</textarea>\
                <input class="btn btn-default col-sm-offset-4 col-sm-2 centralize" type="button" value="Enviar" onclick="writeComment()"/>');
});


$(function () {
    var linksContainer = $('#links');
    var id = localStorage.getItem("id"); 
    var dados = JSON.parse(localStorage.getItem('DramaDataBase'));
    for(var i=0;i<dados.drama[id].gallery.length;i++){
        $('<a/>')
            .append($('<img class="small_image">').prop('src',dados.drama[id].gallery[i]))
            .prop('href', dados.drama[id].gallery[i])
            .prop('title', dados.drama[id].title)
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
    var dados = JSON.parse(localStorage.getItem('DramaDataBase'));
    var id = localStorage.getItem("id"); 
    var newComment = {
        "author" : author,
        "comment" : comment
    }
    dados.drama[id].comments.push(newComment);
    localStorage.setItem('DramaDataBase',JSON.stringify(dados));
    location.reload();
}