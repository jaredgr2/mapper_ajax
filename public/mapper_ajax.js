//Create map view and set default centered location
const mymap = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamFyZWRncjIiLCJhIjoiY2wyNHVkOWhzMjNtMzNqcWR4ZzJ4NXU5ciJ9.-UepG8eI1YBlynJbqu6-lQ'
}).addTo(mymap);

//Called every time user enters a location request
const sendMapData = async (id) =>{
    //Get normalized address and generate api call
    const enteredText = document.getElementById(id).value;
    const normalText = encodeURIComponent(enteredText);
    const addrReq = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +normalText+'.json?access_token=pk.eyJ1IjoiamFyZWRncjIiLCJhIjoiY2wyNHVkOWhzMjNtMzNqcWR4ZzJ4NXU5ciJ9.-UepG8eI1YBlynJbqu6-lQ';
    console.log(addrReq);

    //Awaits response of api call, if successful gets data
    const response = await axios.get(addrReq);
    const data = response.data;

    //Center coordinates and normal place name
    const centerLoc = data.features[0].center;
    const locName = data.features[0].place_name;
    //Change latitude and longitude coords
    centerLoc.reverse();
    console.log(locName);

    //Add marker and change center of map to that location
    L.marker(centerLoc).addTo(mymap);
    mymap.flyTo(centerLoc, 8); 

    //Generate our li elements for each location entered
    const list = document.getElementsByTagName('ul')[0];
    const li = document.createElement('li');
    text = document.createTextNode(locName);

    //Store centered location coords in data attribute
    li.data = centerLoc;
    li.appendChild(text);

    //On click, map centers on coords in data attribute of that location in the list
    li.addEventListener("click",function(){
        mymap.flyTo(li.data,8);
    });
    list.appendChild(li);
    return;
}
