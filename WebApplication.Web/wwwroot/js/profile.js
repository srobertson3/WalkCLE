﻿function getElementFromTemplate(id) {
    let domNode = document.importNode(document.getElementById(id).content, true).firstElementChild;

    return domNode;
}

let checkIns;
let badges;

// Ensures that the page is fully loaded before scripts run.
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Loaded');

    // Once the DOM is fully loaded, get the check-ins and badges for the user.
    getUserCheckIns();
    getUserBadges();
});

/**
 * Gets all the check-ins that a user has performed.
 * @param {number} userId The number that represents the Id of the user.
 */
function getUserCheckIns() {
    const url = `https://localhost:44392/account/getcheckins`
    const settings = {
        method: 'GET',
        credentials: 'include'
    };

    fetch(url, settings)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            checkIns = json;
            addCheckInsToPage(checkIns);
        });
}

/**
 * Uses the check in data to add the elements to the page
 * @param {} checkIns the json from the database that is used to add the check ins to the page. 
 */
function addCheckInsToPage(checkIns) {

    for (let i = 0; i < checkIns.length; i++) {

        const newCheckInDiv = getElementFromTemplate('check-in');

        // Add all information that is received from the API to an element
        newCheckInDiv.querySelector('span.date-earned').innerText = checkIns[i].date.substring(0, 10);
        newCheckInDiv.querySelector('a.location-name').innerText = checkIns[i].locationName;
        newCheckInDiv.querySelector('a').setAttribute("href", `https://localhost:44392/location/detail/${checkIns[i].locationData.id}`);

        // Add the new element to the page
        document.querySelector('div.check-in').insertAdjacentElement('beforeend', newCheckInDiv);

    }
}

function getUserBadges() {
    const url = `https://localhost:44392/account/getbadges`
    const settings = {
        method: 'GET',
        credentials: 'include'
    };

    fetch(url, settings)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            badges = json;
            addBadgesToPage(badges);
        });
}

function addBadgesToPage(badges) {
    
}