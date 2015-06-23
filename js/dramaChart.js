$(document).ready(function () {

    var ctx = $("#myChart").get(0).getContext("2d");
    var cmp = $("#compChart").get(0).getContext("2d");
    var labelArray = [];
    var ratingArray = [];
    $.getJSON("js/json/drama.json", function (dat) {
        dat[0].drama.sort(SortByName);
        for (var i = 0; i < dat[0].drama.length; i++) {
            labelArray.push(dat[0].drama[i].title);
            ratingArray.push(dat[0].drama[i].rating);
            $("#serie1").append("<option value='" + dat[0].drama[i].image + "'>" + dat[0].drama[i].title + "</option>");
            $("#serie2").append("<option value='" + dat[0].drama[i].image + "'>" + dat[0].drama[i].title + "</option>");

        }

        $("#poster1").css("width", "270px");
        $("#poster2").css("width", "270px");
        $("#poster1").attr("src", "img/posters/"+dat[0].drama[0].image);
        /*console.log($("#serie1").value);
        
        $("#poster1").attr("src","");*/

        var data = {
            labels: labelArray,
            datasets: [
                {
                    label: "Séries de Drama",
                    fillColor: "rgba(255,0,0,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: ratingArray
        }

        ]
        };

        var data1 = {
            labels: ["Game of Thrones", "Revenge"],
            datasets: [
                {
                    label: "Séries de Drama",
                    fillColor: "rgba(120,25,255,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: [4.5, 3.5]
        }

        ]
        };

        var myBarChart = new Chart(ctx).Bar(data, {
            scaleGridLineColor: "rgba(0,0,0,.05)"
        });
        new Chart(cmp).Bar(data1, {
            scaleGridLineColor: "rgba(0,0,0,.05)"
        });

    });

    function SortByName(a, b) {
        var aTitle = a.title.toLowerCase();
        var bTitle = b.title.toLowerCase();
        return ((aTitle < bTitle) ? -1 : ((aTitle > bTitle) ? 1 : 0));
    }


});