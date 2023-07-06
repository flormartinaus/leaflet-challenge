//store the URL for the GeoJSON data
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Adding a Leaflet tile layer.
let streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Creating a Leaflet map object.
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streets]
});

//defining basemaps
let baseMaps = {
    "streets": streets
};

//defining the earthquake layergroup
let earthquake_data = new L.LayerGroup();

//defining the overlays and link the layergroups to separate overlays
let overlays = {
    "Earthquakes": earthquake_data,
};

//adding a control layer and pass in baseMaps and overlays
L.control.layers(baseMaps, overlays).addTo(myMap);

//this function will style all the earthquake areas on the map
function earthquakeStyle(feature) {
    return {
        color: chooseColor(feature.geometry.coordinates[2]),
        radius: chooseRadius(feature.properties.mag),
        fillColor: chooseColor(feature.geometry.coordinates[2])
    }
};