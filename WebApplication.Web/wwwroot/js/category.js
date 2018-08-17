﻿function getElementFromTemplate(id) {
    let domNode = document.importNode(document.getElementById(id).content, true).firstElementChild;

    return domNode;
}

document.addEventListener('DOMContentLoaded', () => {
    // Code that runs when the DOM is loaded and verifies we have attached event handlers
    console.log('DOM Loaded');
    getLocation();
});

let map;
let youAreHere;

/**
 * A function that calls google's maps API and returns a map centered on the user's position (comes from html getLocation function) and puts a marker on the map to denote where they are on the map.  We use the map.setOptions property to hide the standard point of interest markers so that we can throw up our own poi's that we will get from the locations database.
 * @param {Object} position (has latitude and longitude properties)
 */
function initMap(position) {
    youAreHere = { lat: position.coords.latitude, lng: position.coords.longitude };
    map = new google.maps.Map(document.getElementById('map'), {
        center: youAreHere,
        zoom: 15,
        mapTypeControl: true
    });
    //puts a marker on the map with the user's position
    let userMarker = new google.maps.Marker({
        position: youAreHere,
        map: map,
        title: 'You Are Here!'
    });

    setCategoryMarkers(locationArray);

    //declares a style to apply to the map object that hides standard poi's
    let noPoi = [
        {
            featureType: "poi",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];
    //tells the map object to honor our hide all standard poi's style
    map.setOptions({ styles: noPoi });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initMap);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

let category;
let locationArray;
var markers = [];

function CategorySearch(youAreHere) {
    category = document.querySelector('p.hidden').innerText;
    console.log(category);
    const url = `https://localhost:44392/Search/CategorySearch?latitude=${youAreHere.lat}&longitude=${youAreHere.lng}&cat=${category}`;
    const settings = {
        method: 'GET'
    };

    return new Promise((resolve, reject) => {
        // Send the request
        fetch(url, settings)
            .then(response => response.json())
            .then(json => {
                console.log(json);  //<-- it may take a while until this runs
                resolve(Array.from(json));
            });
    });
}

function ellipsify(str) {
    if (str.length > 100) {
        return (str.substring(0, 100) + ". . .");
    }
    else {
        return str;
    }
}

async function setCategoryMarkers(locations) {

    locationArray = await CategorySearch(youAreHere, category);
    console.log(locationArray);

    for (let i = 0; i < locationArray.length; i++) {
        let marker = new google.maps.Marker({
            position: { lat: locationArray[i].latitude, lng: locationArray[i].longitude },
            map: map,
            title: locationArray[i].name,
            label: {
                text: `${i + 1}`,
                color: "white",
                fontWeight: "bold",
                fontSize: "16px"
            }
        });
        const newLocationDiv = getElementFromTemplate('nearbyLocation');

        newLocationDiv.querySelector('label#location-name').innerText = locationArray[i].name;
        newLocationDiv.querySelector('label#location-number').innerText = `${i + 1}.`;
        newLocationDiv.querySelector('label#location-desc').innerText = ellipsify(locationArray[i].description);
        newLocationDiv.querySelector('a').setAttribute("href", `location/detail/${locationArray[i].id}`);

        document.querySelector('div.location-name').insertAdjacentElement('beforeend', newLocationDiv);

        markers.push(marker);
    }
}