const map = L.map('map').setView([37.7749, -122.4194], 10);

let CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

CartoDB_Positron.addTo(map)

let mcg = L.markerClusterGroup({
    spiderfyOnMaxZoom: false,
	showCoverageOnHover: true,
	zoomToBoundsOnClick: true
}); 



let Fall = L.featureGroup.subGroup(mcg);
let Winter = L.featureGroup.subGroup(mcg);
let Spring = L.featureGroup.subGroup(mcg);
let Summer = L.featureGroup.subGroup(mcg);


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
    radius: 6,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: .3
}

let myFieldArray = []

function getDistinctValues(targetField){
    // find out how to add distinct values to an array 

    if (!myFieldArray.includes(targetField)){
        myFieldArray.push(targetField)
    } 
    return targetField
      // append values to array 
}


function addMarker(data){
        //L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${data.whereisyourfavoritetraveldestination}</h2> <p>${"Number of times visited: " + data.howmanytimeshaveyouvisitedyourfavoritetraveldestination} </p> <p> ${"Best season to visit: " + data.whatseasonisthebesttimetovisityourfavoritetraveldestination} </p> <h4> ${"Date Posted: " + data.timestamp} </h4>`)
        //createButtons(data.lat,data.lng,data.whereisyourfavoritetraveldestination)
        let myField = data.howmanytimeshaveyouvisitedyourfavoritetraveldestination
        let travelSeason = data.whatseasonisthebesttimetovisityourfavoritetraveldestination
        createButtons(data.lat,data.lng,data.whereisyourfavoritetraveldestination)
        getDistinctValues(myField)
        console.log('all the distinct fields')
        console.log(myFieldArray)
        colorArray = ['green','blue','red','purple']
        // circleOptions.fillColor = 'green'
        circleOptions.fillColor = colorArray[myFieldArray.indexOf(myField)]
        if (travelSeason == "Fall"){          // fix this to diff 
            
            // speakFluentEnglish.addLayer(L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h2>Speaks English fluently</h2>`))
            // createButtons(data.lat,data.lng,data.whereisyourfavoritetraveldestination)
            Fall.addLayer(L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h2>${data.whereisyourfavoritetraveldestination}</h2> <p>${"Number of times visited: " + myField} </p> <p> ${"Best season to visit: " + data.whatseasonisthebesttimetovisityourfavoritetraveldestination} </p> <h4> ${"Date Posted: " + data.timestamp} </h4>`))
            
            return data.timestamp
        }
        else if (travelSeason == "Spring") {
            Spring.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data.whereisyourfavoritetraveldestination}</h2> <p>${"Number of times visited: " + myField} </p> <p> ${"Best season to visit: " + data.whatseasonisthebesttimetovisityourfavoritetraveldestination} </p> <h4> ${"Date Posted: " + data.timestamp} </h4>`))
        }
        else if (travelSeason == "Winter") {
            Winter.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data.whereisyourfavoritetraveldestination}</h2> <p>${"Number of times visited: " + myField} </p> <p> ${"Best season to visit: " + data.whatseasonisthebesttimetovisityourfavoritetraveldestination} </p> <h4> ${"Date Posted: " + data.timestamp} </h4>`))
        }
        else {
            Summer.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data.whereisyourfavoritetraveldestination}</h2> <p>${"Number of times visited: " + myField} </p> <p> ${"Best season to visit: " + data.whatseasonisthebesttimetovisityourfavoritetraveldestination} </p> <h4> ${"Date Posted: " + data.timestamp} </h4>`))
        }
       
        return data   
}

function createButtons(lat,lng,anything){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+anything; // gives the button a unique id
    newButton.innerHTML = anything; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng], 10); //this is the flyTo from Leaflet
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
        // Fall.addTo(map)
        // Winter.addTo(map)   
        // Spring.addTo(map)
        // Summer.addTo(map) 
        let allLayers = L.markerClusterGroup([Fall, Winter, Spring, Summer]);
        allLayers.addTo(map)
        mcg.addTo(map)
        map.fitBounds(allLayers.getBounds()); 
}
let layers = {
	"Fall": Fall,
	"Winter": Winter,
    "Spring" : Spring,
    "Summer" : Summer
}
L.control.layers(null,layers, {collapsed: false}).addTo(map)