require("../../lem_gmaps/build/lem_gmaps.js");

const loadGoogleMapsAPI = require('load-google-maps-api');


loadGoogleMapsAPI({key: "AIzaSyAkbu04rf_WBmWQhuo9c5K8DV1jrsK3Hlw"}).then(function (googleMaps) {
  $('.google-map-demo-1').lemGmaps({
    markers: [
      {
        "lat": 44.530436,
        "lng": -103.887630
      }
    ],
  });

  $('.google-map-demo-2').lemGmaps({
    markers: [
      {
        "lat": 44.530436,
        "lng": -103.887630
      }
    ],
    marker_icon: null
  });

  $('.google-map-demo-3').lemGmaps({
    markers: [
      {
        "lat": 44.530436,
        "lng": -103.887630
      },
      {
        "lat": 55.170730,
        "lng": -118.819305
      }
    ]
  });

  $('.google-map-demo-4').lemGmaps({
    markers: [
      {
        "lat": 44.530436,
        "lng": -103.887630
      }
    ],
    map_options: {
      styles: [
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
            {
              "lightness": 90
            }
          ]
        }
      ]
    }
  });

  $('.google-map-demo-5').lemGmaps();


}).catch((err) => {
  console.error(err)
})