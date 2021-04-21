// declare variables
let zoomLevel = 5;
const mapCenter = [41.8780,-93.0977];

// use the variables
const map = L.map('map').setView(mapCenter, zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var myIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/1200px-Patrick_Star.svg.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    //shadowUrl: '',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

// create a function to add markers
function pstarMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng],{icon: myIcon}).addTo(map).bindPopup(`<h2>${message}</h2>`).openPopup();
    createButtons(lat,lng,title); // new line!!!
    return message
}

// create a function to add buttons with a fly to command
function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 

    // attach an event listner to the button with Leaflet's map.flyTo
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); 
    })
    document.body.appendChild(newButton); //this adds the button to our page.
    document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/f1/cb/0e/f1cb0e6ea717ecda79933469efbfb5f9.gif')";
    document.getElementById("myH1").style.color = "#ffffff";
    document.getElementById("myP").style.color = "#ffffff";

}

// use our marker functions
pstarMarker(36.8879,-118.5551, 'Kings Canyon','Kings Canyon: nice for hiking')
pstarMarker(37.6251, -119.0850, 'Devils Postpile','Devils Postpile National Monument: has unique rock patterns')
pstarMarker(36.0544,-112.1401, 'Grand Canyon','Grand Canyon National Park: hot in the summer')
pstarMarker(38.2692, -119.5742,'Sierra Nevada Mountains','Sierra Nevada Mountains: snow! ')
pstarMarker(41.288139, -70.098923,'Easton Beach','Easton Beach: the beach and the surrounding area is very quiet')
pstarMarker(44.4280, -110.5885,'Yellowstone','Yellowstone National Park: lots of geysers, which I rarely see in California  ')
pstarMarker(39.0575, -108.6939,'Colorado National Monument','Colorado National Monument: breathtaking views')
pstarMarker(37.8651, -119.5383,'Yosemite','Yosemite National Park: waterfalls and bear cubs during the daytime')