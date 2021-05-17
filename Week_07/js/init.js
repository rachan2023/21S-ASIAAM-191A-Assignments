const map = L.map('map').setView([37.7749, -122.4194], 10);

let OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
OpenTopoMap.addTo(map)

let speakFluentEnglish = L.featureGroup();
let speakOtherLanguage = L.featureGroup();


let url = "https://spreadsheets.google.com/feeds/list/1ErJfY74kCqb2yvCt_MzLyJUvB-tNF5JD9TwxnCybTJs/o9c8k0l/public/values?alt=json"
fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
        console.log(data)
        formatData(data)
    })

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

function addMarker(data){
        //L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${data.whereisyourfavoritetraveldestination}</h2> <p>${"Number of times visited: " + data.howmanytimeshaveyouvisitedyourfavoritetraveldestination} </p> <p> ${"Best season to visit: " + data.whatseasonisthebesttimetovisityourfavoritetraveldestination} </p> <h4> ${"Date Posted: " + data.timestamp} </h4>`)
        //createButtons(data.lat,data.lng,data.whereisyourfavoritetraveldestination);
        if (data.doyouspeakenglishfluently == "Yes"){
            circleOptions.fillColor == 'green'
            speakFluentEnglish.addLayer(L.circleMarker([data.lat,data.lng]).bindPopup(`<h2>Speaks English fluently</h2>`))
            createButtons(data.lat,data.lng,data.location)
            return data.timestamp
        }
        else {
            circleOptions.color == 'red'
            speakOtherLanguage.addLayer(L.circleMarker([data.lat,data.lng]).bindPopup(`<h2> Does not speak English fluently</h2>`))
        }
        return data   
}

function createButtons(lat,lng,whereisyourfavoritetraveldestination){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+whereisyourfavoritetraveldestination; // gives the button a unique id
    newButton.innerHTML = whereisyourfavoritetraveldestination; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('contents')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}


function formatData(theData){
        const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
        const rows = theData.feed.entry
        for(const row of rows) {
          const formattedRow = {}
          for(const key in row) {
            if(key.startsWith("gsx$")) {
                  formattedRow[key.replace("gsx$", "")] = row[key].$t
            }
          }
          formattedData.push(formattedRow)
        }
        console.log(formattedData)
        formattedData.forEach(addMarker)    
        speakFluentEnglish.addTo(map)
        speakOtherLanguage.addTo(map)   
        let allLayers = L.featureGroup([speakFluentEnglish, speakOtherLanguage]);
        map.fitBounds(allLayers.getBounds()); 
}
let layers = {
	"Speaks English": speakFluentEnglish,
	"Speaks Other Languages": speakOtherLanguage
}
L.control.layers(null,layers).addTo(map)