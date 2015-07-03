 $(document).ready(function(){
 	for(var i =1980; i<2016;i++){
 		$(".years").append("<option>"+i+"</option>");	
}
	$("#author").append(localStorage.getItem("user"));
});

function validateForm() {
    var name = document.forms["registerForm"]["name"].value;
    var plot = document.forms["registerForm"]["plot"].value;
    var img = document.forms["registerForm"]["img"].value;
    var category = document.forms["registerForm"]["category"].value;
    var producer = document.forms["registerForm"]["producer"].value;
    var time = document.forms["registerForm"]["time"].value;
    var end = document.forms["registerForm"]["end"].value;
    var start = document.forms["registerForm"]["start"].value;

    if (name == null || name == "") {
        alert("Nome da série deve ser preenchido");
        return false;
    }
    else if (plot == null || plot == "") {
        alert("Descrição deve ser preenchida");
        return false;
    }
    else if (img == null || img == "") {
        alert("Pelo menos uma imagem deve ser submetida");
        return false;
    }
    else if (category == null || category == "") {
        alert("Escolha uma categoria");
        return false;
    }
    else if (start == null || start == "") {
        alert("Selecione um ano de inicio");
        return false;
    }
    else if (end == null || end == "") {
        alert("Selecione um ano de fim (ou em continuidade)");
        return false;
    }
    else if (time == null || time == "") {
        alert("Preencha o campo duração");
        return false;
    }
    else if (producer == null || producer == "") {
        alert("O campo produtora deve ser preenchido");
        return false;
    }
    else{
    	saveSerie();
    	location.href = "index.html";
    }
}

function saveSerie(){
	var serieCategory = document.getElementById("category").value;
	var dataBase;
	var jsonAddress;
	var categ;
	var id;
	if(serieCategory == "Ação"){
		dataBase = "ActionDataBase";
		jsonAddress = "js/json/acao.json"
		categ = "acao"
	}
	if(serieCategory == "Comédia"){
		dataBase = "ComedyDataBase";
		jsonAddress = "js/json/comedia.json"
		categ = "comedia"
	}
	if(serieCategory == "Crime"){
		dataBase = "CrimeDataBase";
		jsonAddress = "js/json/crime.json"
		categ = "crime"
	}
	if(serieCategory == "Drama"){
		dataBase = "DramaDataBase";
		jsonAddress = "js/json/drama.json"
		categ = "drama"
	}

	if(localStorage.getItem(dataBase) == null){
        $.ajaxSetup({ mimeType: "text/plain" });
        $.getJSON("js/json/"+categ+".json", function (data) {
            localStorage.setItem(dataBase,JSON.stringify(data));
        });
    }
	var category = JSON.parse(localStorage.getItem(dataBase));
	var title = document.getElementById("name").value;
	var description = document.getElementById("plot").value;
	var image = document.getElementsByClassName("file-preview-image");

	var imgAsDataURL = [];
	for(var i = 0; i< image.length; i++){
		var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");
 
    	imgCanvas.width = 430;
    	imgCanvas.height = 480;
 	
    	imgContext.drawImage(image[i], 0, 0, 430, 480);
 
    	imgAsDataURL[i] = imgCanvas.toDataURL("image/png");
	}
    
    var year = document.getElementById("start").value;
	var status = document.getElementById("end");
	if ( status != "Em continuidade")
		status = "Finalizada";
	var duration = document.getElementById("time").value;
	var producer = document.getElementById("producer").value;
	var director = document.getElementById("director").value;
    var starring = document.getElementById("starring").value;
    var episodes = document.getElementById("episodes").value;
    var season = document.getElementById("season").value;
    var trailer = document.getElementById("trailer").value;

    var id;
	if(serieCategory == "Ação"){
		id = category.acao.length;
	}
	if(serieCategory == "Comédia"){
		id = category.comedia.length;
	}
	if(serieCategory == "Crime"){
		id = category.crime.length;
	}
	if(serieCategory == "Drama"){
		id = category.drama.length;
	}
    var newSerie = {
		"title": title,
        "rating": "4.5",
        "id":id,
        "year": year,
        "duration": duration,
        "channel": producer,
        "status": status,
        "description": description,
        "reviews": "1",
        "image": imgAsDataURL[0],
        "noSeasons": season,
        "noEpisodes": episodes,
        "director":director,
        "trailer": trailer,
        "starring": [starring
        ],
        "gallery": imgAsDataURL,
        "comments": [
                ]
    }
    if(serieCategory == "Ação"){
		category.acao.push(newSerie); //insere no json
	}
	if(serieCategory == "Comédia"){
		category.comedia.push(newSerie); //insere no json
	}
	if(serieCategory == "Crime"){
		category.crime.push(newSerie); //insere no json
	}
	if(serieCategory == "Drama"){
		category.drama.push(newSerie); //insere no json
	}
    localStorage.setItem(dataBase,JSON.stringify(category)); //atualiza sessao com novo json
}