// JavaScript const variable declaration
const map = L.map('map').setView([27.677853,120.709208], 5);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//JavaScript let variable declaration to create a marker
fetch("js/city.geojson")
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
                return layer.feature.properties.city;
             }).addTo(map);
        });
