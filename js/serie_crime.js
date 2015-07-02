$(document).ready(function () {

    var dados = JSON.parse(localStorage.getItem('CrimeDataBase'));
    var id = localStorage.getItem("id");
    pageLoader();

    function pageLoader() {
        $(".main-holder").html("");
        $.ajaxSetup({
            mimeType: "text/plain"
        });
        var rating = countStars(dados.crime[id].rating);
        var starring = findActors();
        $("title").append(dados.crime[id].title);
        $(".main-holder").append('<article itemscope itemtype="http://schema.org/TVSeries" class="col-md-12"><img class="show-img col-sm-4 img-responsive" src="' + dados.crime[id].image + '" alt=" poster da serie' + dados.crime[id].title + '"><div class="show-info col-sm-6  centralize"><h1 class="show-title"><span itemprop="name" lang="en">' +
            dados.crime[id].title + '</span></h1><span class="col-sm-11 col-sm-offset-1 rating-stars">' + rating + '                    </span><ul class="more-info"><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span><span itemprop="startDate">' + dados.crime[id].year + '</span></li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + dados.crime[id].duration + '</li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span><span itemprop="productionCompany">' + dados.crime[id].channel + '</span></li><li><span class="glyphicon glyphicon-star col-sm-1" aria-hidden="true"></span>' + dados.crime[id].status + '</li></ul><div class="description"><p><span itemprop="about">' + dados.crime[id].description + '</span></p><p>Diretor:<span itemprop="director"> ' + dados.crime[id].director + '</span></p><h2>Estrelando</h2><p><ul id="starring">' + starring + '</ul></p><p>Numero de Episodios:<span itemprop="numberOfEpisodes"> ' + dados.crime[id].noEpisodes + '</span></p><p>Numero de Temporadas:<span itemprop="numberOfseasons"> ' + dados.crime[id].noSeasons + '</span></p><p>Avaliado por <span class="users_number">' + dados.crime[id].reviews + ' </span>usuários</p></div></div><p class="show-info col-sm-6">Avalie essa série também:</p><form class="col-sm-6 starStyle"><input id="input-2c" class="rating" min="0" max="5" step="0.5" data-size="sm" data-symbol="&#xf005;" data-glyphicon="false" data-rating-class="rating-fa" value="0"></form></article>');
        //Inserção do iframe para o trailer
        if (dados.crime[id].trailer == "") {
            $("#trailer").append('<p>Não há trailer para essa série.</p>');
        } else
            $("#trailer").append('<iframe itemprop="trailer" width="420" height="315" src="' + dados.crime[id].trailer + '" frameborder="0" allowfullscreen"></iframe>');

        //Inserção de comentarios
        if (dados.crime[id].comments.length == 0)
            $(".comments").append('<p>Não há comentários para essa série ainda.</p>');
        else
            for (var i = 0; i < dados.crime[id].comments.length; i++)
                $(".comments").append('<div class="comment"><p>Autor: ' + dados.crime[id].comments[i].author + '</p><p><span itemprop="comment">' + dados.crime[id].comments[i].comment + '</span></p></div>');

        //Inserção das imagens da galeria
        if (dados.crime[id].gallery.length == 0)
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

    function findActors() {
        var starring = "";
        for (var i = 0; i < dados.crime[id].starring.length; i++) {

            starring = starring + '<li class="actors" itemprop="actor">' + dados.crime[id].starring[i] + '</li>';
        }
        return starring;
    }


    $('#input-2c').on('rating.change', function (event, value, caption) {
        if (localStorage.getItem("logged") == null) {
            alert("Você deve estar logado para avaliar uma série");
            return;
        }
        dados.crime[id].reviews++;
        dados.crime[id].rating = (parseFloat(dados.crime[id].rating) + parseFloat(value)) / dados.crime[id].reviews
        console.log(dados.crime[id].rating);
        $('#input-2c').rating('destroy');
        localStorage.setItem('CrimeDataBase', JSON.stringify(dados));
    });


    if (localStorage.getItem("logged") == 1)
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
    var dados = JSON.parse(localStorage.getItem('CrimeDataBase'));
    for (var i = 0; i < dados.crime[id].gallery.length; i++) {
        $('<a/>')
            .append($('<img class="small_image">').prop('src', dados.crime[id].gallery[i]))
            .prop('href', dados.crime[id].gallery[i])
            .prop('title', dados.crime[id].title)
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

});

function writeComment() {
    var comment = document.getElementById("comment").value;
    var author = document.getElementById("name").value;
    var dados = JSON.parse(localStorage.getItem('CrimeDataBase'));
    var id = localStorage.getItem("id");
    var newComment = {
        "author": author,
        "comment": comment
    }
    dados.crime[id].comments.push(newComment);
    localStorage.setItem('CrimeDataBase', JSON.stringify(dados));
    location.reload();
}