const _ = "fb546139f933b8664332f96848b641153631454";

var address = document.querySelector('.address');
var locations = document.querySelector('.location');
var timezone = document.querySelector('.timezone');
var isp = document.querySelector('.isp');


if ('geolocation' in navigator) {
    $.get("https://api64.ipify.org?format=json", function (data) {
        console.log(data.ip);
        getIP(data.ip);
    });
}

function getInput(e) {
    getIP(e.value);
}

function getIP(e) {
    $.get("http://ip-api.com/json/" + e, function (data) {
        console.log(data);
        address.innerHTML = e;
        timezone.innerHTML = data.timezone;

        $.get("https://api.geocod.io/v1.7/reverse?q=" + data.lat + "," + data.lon + "&api_key=" + _, function (response) {
            locations.innerHTML = response.results[0].address_components.city + ", " + response.results[0].address_components.country;
            console.log(response.results[0]);
        });

        isp.innerHTML = data.isp;

    });

}