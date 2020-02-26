$(document).ready(function() {
    var history = [];
    localStorage.setItem("history", JSON.stringify(history));
    getHistory();
    $('#run-search').on("click", function() {
        event.preventDefault();
        var input = $("#search-value").val();
        var city = input[0].toUpperCase() + input.slice(1);
        history.push(city);
        localStorage.setItem("history", JSON.stringify(history));

        // $(".historyli").empty();
        // var parseHistory = JSON.parse(localStorage.getItem("history"));
        // parseHistory.forEach(element => {
        //     var li = $("<li>").text(element)
        //     $(".historyli").append(li);
        // });
        getHistory();

        var lat;
        var lon;
        var uv;
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c10bb3bd22f90d636baa008b1529ee25&units=imperial"

        function getUV(lat, lon) {
            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=c10bb3bd22f90d636baa008b1529ee25&lat=" + lat + "&lon=" + lon;
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function(data) {
                uv = data.value;
                console.log("uv call", data.value);
                $("#uv").text("UV Index: " + uv);

            });
        }

        function forcast(city) {
            var fcURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=c10bb3bd22f90d636baa008b1529ee25&units=imperial"
            $.ajax({
                url: fcURL,
                method: "GET"
            }).then(function(fcData) {
                console.log(fcData);
                var fc1 = fcData.list[4].dt_txt.slice(0, 10);
                var fc2 = fcData.list[12].dt_txt.slice(0, 10);
                var fc3 = fcData.list[20].dt_txt.slice(0, 10);
                var fc4 = fcData.list[28].dt_txt.slice(0, 10);
                var fc5 = fcData.list[36].dt_txt.slice(0, 10);
                var $fc1Div = $("<div>");
                var $fc2Div = $("<div>");
                var $fc3Div = $("<div>");
                var $fc4Div = $("<div>");
                var $fc5Div = $("<div>");

                var fc1Icon = fcData.list[4].weather[0].icon;
                var fc2Icon = fcData.list[12].weather[0].icon;
                var fc3Icon = fcData.list[20].weather[0].icon;
                var fc4Icon = fcData.list[28].weather[0].icon;
                var fc5Icon = fcData.list[36].weather[0].icon;

                var fc1temp = fcData.list[4].main.temp;
                var fc2temp = fcData.list[12].main.temp;
                var fc3temp = fcData.list[20].main.temp;
                var fc4temp = fcData.list[28].main.temp;
                var fc5temp = fcData.list[36].main.temp;

                var fc1hmdy = fcData.list[4].main.humidity;
                var fc2hmdy = fcData.list[12].main.humidity;
                var fc3hmdy = fcData.list[20].main.humidity;
                var fc4hmdy = fcData.list[28].main.humidity;
                var fc5hmdy = fcData.list[36].main.humidity;

                var $fc1 = $("<h6>").text(fc1);
                var $fc2 = $("<h6>").text(fc2);
                var $fc3 = $("<h6>").text(fc3);
                var $fc4 = $("<h6>").text(fc4);
                var $fc5 = $("<h6>").text(fc5);

                var $fc1Icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + fc1Icon + "@2x.png");
                var $fc2Icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + fc2Icon + "@2x.png");
                var $fc3Icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + fc3Icon + "@2x.png");
                var $fc4Icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + fc4Icon + "@2x.png");
                var $fc5Icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + fc5Icon + "@2x.png");

                var $fc1temp = $("<p>").text("Temp: " + fc1temp + " °F");
                var $fc2temp = $("<p>").text("Temp: " + fc2temp + " °F");
                var $fc3temp = $("<p>").text("Temp: " + fc3temp + " °F");
                var $fc4temp = $("<p>").text("Temp: " + fc4temp + " °F");
                var $fc5temp = $("<p>").text("Temp: " + fc5temp + " °F");

                var $fc1hmdy = $("<p>").text("Humidity: " + fc1hmdy + "%");
                var $fc2hmdy = $("<p>").text("Humidity: " + fc2hmdy + "%");
                var $fc3hmdy = $("<p>").text("Humidity: " + fc3hmdy + "%");
                var $fc4hmdy = $("<p>").text("Humidity: " + fc4hmdy + "%");
                var $fc5hmdy = $("<p>").text("Humidity: " + fc5hmdy + "%");
                $fc1Div.append($fc1);
                $fc2Div.append($fc2);
                $fc3Div.append($fc3);
                $fc4Div.append($fc4);
                $fc5Div.append($fc5);
                $fc1Div.append($fc1Icon);
                $fc2Div.append($fc2Icon);
                $fc3Div.append($fc3Icon);
                $fc4Div.append($fc4Icon);
                $fc5Div.append($fc5Icon);
                $fc1Div.append($fc1temp);
                $fc2Div.append($fc2temp);
                $fc3Div.append($fc3temp);
                $fc4Div.append($fc4temp);
                $fc5Div.append($fc5temp);
                $fc1Div.append($fc1hmdy);
                $fc2Div.append($fc2hmdy);
                $fc3Div.append($fc3hmdy);
                $fc4Div.append($fc4hmdy);
                $fc5Div.append($fc5hmdy);
                $("#square1").html($fc1Div);
                $("#square2").html($fc2Div);
                $("#square3").html($fc3Div);
                $("#square4").html($fc4Div);
                $("#square5").html($fc5Div);
            });
        }
        if (city !== '') {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(queryURL);
                console.log(response);
                var today = moment().format("M/D/YYYY");
                var $weatherDiv = $("<div>");

                var temp = response.main.temp;
                var humidity = response.main.humidity;
                var wSpeed = response.wind.speed;
                var icon = response.weather[0].icon;
                console.log(icon);
                lat = response.coord.lat;
                lon = response.coord.lon;
                console.log(lat);
                console.log(lon);

                var $cityDiv = $("<h2>").text(city + " (" + today + ")");

                var $icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
                var $temp = $("<p>").text("Temperature: " + temp + " °F");
                var $humidity = $("<p>").text("Humidity: " + humidity + "%");
                var $wSpeed = $("<p>").text("Wind Speed: " + wSpeed + " MPH");
                var $uvIndex = $("<p>").attr("id", "uv");

                $weatherDiv.append($cityDiv);
                $weatherDiv.append($icon);
                $weatherDiv.append($temp);
                $weatherDiv.append($humidity);
                $weatherDiv.append($wSpeed);
                $weatherDiv.append($uvIndex);

                // $("#weather-view").html($weatherDiv);
                $("#weather-view").html($weatherDiv);
                getUV(lat, lon);
                forcast(city);
            });
        } else {
            $('#error').html('Field cannot be empty!');
        }
    });

    function getHistory() {
        //$(".historyli").empty();
        var parseHistory = JSON.parse(localStorage.getItem("history"));
        parseHistory.forEach(element => {
            var li = $("<li>").text(element)
            $(".historyli").append(li);
        });
    }
});