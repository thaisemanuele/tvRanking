$(document).ready(function () {

    var ctx = $("#myChart").get(0).getContext("2d");
    var cmp1 = $("#compChart").get(0).getContext("2d");
    var cmp2 = $("#compChart2").get(0).getContext("2d");
    var labelArray = [];
    var ratingArray = [];
    var rating1 = [];
    var rating2 = [];
    var serie1Name =[];
    var serie2Name =[];

        var dados = JSON.parse(localStorage.getItem('ActionDataBase'));
        dados.acao.sort(SortByName);
        for (var i = 0; i < dados.acao.length; i++) {
            labelArray.push(dados.acao[i].title);
            ratingArray.push(dados.acao[i].rating);
            $("#serie1").append("<option value='" + dados.acao[i].id + "'>" + dados.acao[i].title + "</option>");
            $("#serie2").append("<option value='" + dados.acao[i].id + "'>" + dados.acao[i].title + "</option>");

        }

        $("#poster1").css("width", "240px");
        $("#poster2").css("width", "240px");
        $("#poster1").css("height", "260px");
        $("#poster2").css("height", "260px");

        /*console.log($("#serie1").value);
        
        $("#poster1").attr("src","");*/

        var data = {
            labels: labelArray,
            datasets: [
                {
                    label: "Séries de Ação",
                    fillColor: "rgba(190,61,66,0.7)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: ratingArray
        }

        ]
        };

        var data1 = {
            labels: serie1Name,
            datasets: [
                {
                    label: "Séries de Ação",
                    fillColor: "rgba(233,194,26,0.8)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: rating1
        }

        ]
        };
        
        var data2 = {
            labels: serie2Name,
            datasets: [
                {
                    label: "Séries de Ação",
                    fillColor: "rgba(120,125,255,0.8)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: rating2
        }

        ]
        };

        var myBarChart = new Chart(ctx).Bar(data, {
            scaleGridLineColor: "rgba(0,0,0,.05)"
        });
        var myCompChart1 = new Chart(cmp1).Bar(data1, {
            scaleGridLineColor: "rgba(0,0,0,.05)"
        });
        
        var myCompChart2 = new Chart(cmp2).Bar(data2, {
            scaleGridLineColor: "rgba(0,0,0,.05)"
        });
        var id = localStorage.getItem("compare");
        console.log("ID = "+id);
        if( id != null){
            localStorage.setItem("compare",null);
             for (var i = 0; i < dados.acao.length; i++) {
                    if (dados.acao[i].id == id) {
                        img = dados.acao[i].image;
                        break;
                    }
                }
               $("#poster1").attr("src", img);
                serie1Name[0] = dados.acao[i].title;
                rating1[0] = dados.acao[i].rating;
                myCompChart1.removeData();
                myCompChart1.addData(rating1,serie1Name);
                myCompChart1.update();
            }
            $("#serie1").on("change", function () {
                var id = $("#serie1").val();
                var img;
                for (var i = 0; i < dados.acao.length; i++) {
                    if (dados.acao[i].id == id) {
                        console.log(dados.acao[i].image);
                        img = dados.acao[i].image;
                        break;
                    }
                }
               $("#poster1").attr("src", img);
                serie1Name[0] = dados.acao[i].title;
                rating1[0] = dados.acao[i].rating;
                myCompChart1.removeData();
                myCompChart1.addData(rating1,serie1Name);
                myCompChart1.update();
            });
        
        $("#serie2").on("change", function () {
            var id = $("#serie2").val();
            var img;
                for (var i = 0; i < dados.acao.length; i++) {
                    if (dados.acao[i].id == id) {
                        console.log(dados.acao[i].image);
                        img = dados.acao[i].image;
                        break;
                    }
                }
               $("#poster2").attr("src", img);
                serie2Name[0] = dados.acao[i].title;
                rating2[0] = dados.acao[i].rating;
                myCompChart2.removeData();
                myCompChart2.addData(rating2,serie2Name);
                myCompChart2.update();

        });
        

    

    function SortByName(a, b) {
        var aTitle = a.title.toLowerCase();
        var bTitle = b.title.toLowerCase();
        return ((aTitle < bTitle) ? -1 : ((aTitle > bTitle) ? 1 : 0));
    }

    function getTitle(id) {
        var dados = JSON.parse(localStorage.getItem('ActionDataBase'));
            for (var i = 0; i < dados.acao.length; i++) {
                if (dados.acao[i].id == id)
                    return dados.acao[i].title;
            }
    }

    function getImage(id) {
        var dados = JSON.parse(localStorage.getItem('ActionDataBase'));
            for (var i = 0; i < dados.acao.length; i++) {
                if (dados.acao[i].id == id) {
                    console.log(dados.acao[i].image);
                    return (dados.acao[i].image);
                    break;
                }


            }
    }

    function getRating(id) {
        var dados = JSON.parse(localStorage.getItem('ActionDataBase'));
            for (var i = 0; i < dados.acao.length; i++) {
                if (dados.acao[i].id == id) {
                    return dados.acao[i].rating;
                    break;
                }

            }
    }


});