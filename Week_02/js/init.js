// JavaScript const variable declaration
const map = L.map('map').setView([36.218057,-121.400742], 5);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//JavaScript let variable declaration to create a marker
fetch("js/nationalparks.geojson")
    .then(response => {
         return response.json();
          })
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
                    // the leaflet method for adding a geojson
             L.geoJSON(data, {
                 style: function (feature) {
                    return {color: 'red'};
                 }
            }).bindPopup(function (layer) {
                return layer.feature.properties.park;
             }).addTo(map);
        });
// this is a function to get the color, notice how the numbers are hard coded, who decides that?
function getColor(d) {
    return d > 1000000 ? '#800026' :
            d > 500000  ? '#BD0026' :
            d > 200000   ? '#FEB24C' :
            d > 10000   ? '#FED976' :
                        '#FFEDA0';
}

// this is the generation function for the style, notice it uses the getColor function
function style(feature) {
    return {
        fillColor: getColor(feature.properties.TOTAL_POP),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

fetch("js/lab1.geojson")
    .then(response => {
        return response.json()
    })
    .then(ca_counties =>{
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(ca_counties, {
            style: style
        }).bindPopup(function (layer) {
            return layer.feature.properties.name;
        }).addTo(map);
    })
