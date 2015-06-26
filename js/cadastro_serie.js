 $(document).ready(function(){
 	for(var i =1980; i<2016;i++){
 		$(".years").append("<option>"+i+"</option>");	
}
	$("#author").append(localStorage.getItem("user"));
});


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
    location.href = "index.html";
}