const map = L.map('map').setView([36.7378, -119.7871], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let url = "https://spreadsheets.google.com/feeds/list/1ErJfY74kCqb2yvCt_MzLyJUvB-tNF5JD9TwxnCybTJs/o9c8k0l/public/values?alt=json"
fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
        console.log(data)
        formatData(data)
    })

function addMarker(data){
        L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${data.whereisyourfavoritetraveldestinationincalifornia}</h2>${"Number of times visited: " + data.howmanytimeshaveyouvisitedyourfavoritetraveldestination} <p>${"Best season to visit: " + data.whatseasonisthebesttimetovisityourfavoritetraveldestination}</p>`)
        return data   
}

// addMarker(37,-122,'home land!')
// let myArray = ['hello','this','is','an','array']
// myArray.forEach(justChecking);
// function justChecking(data){
//     console.log(data)
// }

// let grocery = ['orange', 'apple', 'berry']
// grocery.forEach(inBag);
// function inBag(data) {
//     console.log(data + ' is in grocery bag.')
// }

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)

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
}