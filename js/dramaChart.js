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

    $.getJSON("js/json/drama.json", function (dat) {
        dat[0].drama.sort(SortByName);
        for (var i = 0; i < dat[0].drama.length; i++) {
            labelArray.push(dat[0].drama[i].title);
            ratingArray.push(dat[0].drama[i].rating);
            $("#serie1").append("<option value='" + dat[0].drama[i].id + "'>" + dat[0].drama[i].title + "</option>");
            $("#serie2").append("<option value='" + dat[0].drama[i].id + "'>" + dat[0].drama[i].title + "</option>");

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
                    label: "Séries de Drama",
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
                    label: "Séries de Drama",
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
                    label: "Séries de Drama",
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
        
        $("#serie1").on("change", function () {
            var id = $("#serie1").val();
            var img;
            var path = "img/posters/";
            $.getJSON("js/json/drama.json", function (dat) {
                for (var i = 0; i < dat[0].drama.length; i++) {
                    if (dat[0].drama[i].id == id) {
                        console.log(dat[0].drama[i].image);
                        img = dat[0].drama[i].image;
                        path = path.concat(img);
                        break;
                    }
                }
               $("#poster1").attr("src", path);
                serie1Name[0] = dat[0].drama[i].title;
                rating1[0] = dat[0].drama[i].rating;
                myCompChart1.removeData();
                myCompChart1.addData(rating1,serie1Name);
                myCompChart1.update();
            });

        });
        
        $("#serie2").on("change", function () {
            var id = $("#serie2").val();
            var img;
            var path = "img/posters/";
            $.getJSON("js/json/drama.json", function (dat) {
                for (var i = 0; i < dat[0].drama.length; i++) {
                    if (dat[0].drama[i].id == id) {
                        console.log(dat[0].drama[i].image);
                        img = dat[0].drama[i].image;
                        path = path.concat(img);
                        break;
                    }
                }
               $("#poster2").attr("src", path);
                serie2Name[0] = dat[0].drama[i].title;
                rating2[0] = dat[0].drama[i].rating;
                myCompChart2.removeData();
                myCompChart2.addData(rating2,serie2Name);
                myCompChart2.update();
            });

        });
        

    });

    function SortByName(a, b) {
        var aTitle = a.title.toLowerCase();
        var bTitle = b.title.toLowerCase();
        return ((aTitle < bTitle) ? -1 : ((aTitle > bTitle) ? 1 : 0));
    }

    function getTitle(id) {
        $.getJSON("js/json/drama.json", function (dat) {
            for (var i = 0; i < dat[0].drama.length; i++) {
                if (dat[0].drama[i].id == id)
                    return dat[0].drama[i].title;
            }
        });
    }

    function getImage(id) {
        $.getJSON("js/json/drama.json", function (dat) {
            for (var i = 0; i < dat[0].drama.length; i++) {
                if (dat[0].drama[i].id == id) {
                    console.log(dat[0].drama[i].image);
                    return (dat[0].drama[i].image);
                    break;
                }


            }
        });
    }

    function getRating(id) {
        $.getJSON("js/json/drama.json", function (dat) {
            for (var i = 0; i < dat[0].drama.length; i++) {
                if (dat[0].drama[i].id == id) {
                    return dat[0].drama[i].rating;
                    break;
                }

            }
        });
    }


});