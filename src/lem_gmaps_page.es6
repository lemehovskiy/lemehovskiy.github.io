require("../../lem_gmaps/build/lem_gmaps.js");

const loadGoogleMapsAPI = require('load-google-maps-api')



loadGoogleMapsAPI({key: "AIzaSyAkbu04rf_WBmWQhuo9c5K8DV1jrsK3Hlw"}).then(function(googleMaps) {
    $('.google-map-demo-1').lemGmaps({
        markers: [
            {
                "lat": 44.530436,
                "lng": -103.887630
            }
        ],
    });
}).catch((err) => {
    console.error(err)
})
