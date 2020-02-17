$(document).ready(function () {
    $('#run-search').on("click", function () {
        event.preventDefault();
        var input = $("#search-value").val();
        var city = input[0].toUpperCase()+input.slice(1);
        var history = [];
        history.push(city);
        localStorage.setItem("history", JSON.stringify(history));
        var parseHistory = JSON.parse(localStorage.getItem("history")) || [];
        parseHistory.forEach(element => {
           var li = $("<li>").text(element)
           $(".historyli").append(li);
        });

        var lat;
        var lon;
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c10bb3bd22f90d636baa008b1529ee25&units=imperial"

        function getUV(lat, lon) {
            var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=c10bb3bd22f90d636baa008b1529ee25&lat=" + lat + "&lon=" + lon;
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (data) {
                var uv = data.value;
                console.log(uv);
            });
        }


        if (city !== '') {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(queryURL);
                console.log(response);
                var today = moment().format("M/D/YYYY");
                var $weatherDiv = $("<div>");
                var temp = response.main.temp;
                var humidity = response.main.humidity;
                var wSpeed = response.wind.speed;
                lat = response.coord.lat;
                lon = response.coord.lon;
                console.log(lat);
                console.log(lon);

                var $cityDiv = $("<h2>").text(city + " (" + today + ")");
                var $temp = $("<p>").text("Temperature: " + temp + " °F");
                var $humidity = $("<p>").text("Humidity: " + humidity + "%");
                var $wSpeed = $("<p>").text("Wind Speed: " + wSpeed + " MPH");

                $weatherDiv.append($cityDiv);
                $weatherDiv.append($temp);
                $weatherDiv.append($humidity);
                $weatherDiv.append($wSpeed);

                $("#weather-view").html($weatherDiv);
                getUV(lat, lon);
            });
        }
        else {
            $('#error').html('Field cannot be empty!');
        }
    });
});
