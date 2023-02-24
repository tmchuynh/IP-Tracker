const _ = "fb546139f933b8664332f96848b641153631454";

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
    })
}