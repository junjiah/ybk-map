/* global L: Leaflet object */

var map = L.map('map').setView([37.7841393, -122.3957547], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
  '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'mapbox.streets'
}).addTo(map);

var popup = L.popup();


function onEachFeature(feature, layer) {
  var popupContent = '<h2><a href="' +
    feature.properties.url + '">' +
    feature.properties.name + '</a></h2>';

  if (feature.properties && feature.properties.popupContent) {
    popupContent += feature.properties.popupContent;
  }

  layer.bindPopup(popupContent);
}


function renderGeoJSON(data) {
  var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

  var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
  };
  L.geoJson(data.features, {
    style: myStyle,
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  }).addTo(map);
}

// Load geojson file asynchronously.
var xobj = new XMLHttpRequest();
xobj.overrideMimeType('application/json');
xobj.open('GET', 'bookmarks.geojson', true);
xobj.onreadystatechange = function () {
  if (xobj.readyState === 4 && xobj.status === 200) {
    renderGeoJSON(JSON.parse(xobj.responseText));
  }
};
xobj.send(null);