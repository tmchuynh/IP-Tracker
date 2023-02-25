import code from './config.js';

const _ = code._;
const __ = code.__;

var form_control = document.querySelector(".form-control");
var address = document.querySelector('.address');
var locations = document.querySelector('.location');
var timezone = document.querySelector('.timezone');
var isp = document.querySelector('.isp');


if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        initMap(latitude, longitude);
    })
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
            if(response.results.length == 0) {
                form_control.text = "";

                alert(response._warnings[0])
                return;
            }
            locations.innerHTML = response.results[0].address_components.city + ", " + response.results[0].address_components.country;
            console.log(response.results[0].location);
            initMap(response.results[0].location.lat, response.results[0].location.lng);
        });

        isp.innerHTML = data.isp;

    });

}

function initMap(latitude, longitude) {
    const loc = { lat: latitude, lng: longitude };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: loc,
    });

    const marker = new google.maps.Marker({
        position: loc,
        map: map,
    });
}
