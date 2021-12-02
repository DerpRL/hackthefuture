"use strict";

document.addEventListener("DOMContentLoaded", init)

function init() {
    loadAllSuspects();
}

function loadAllSuspects() {

    getRequest('suspect', (err, result) => {
        if (err) console.error("Error getting the suspects.");

        result.forEach(suspect => {
            console.log(suspect)

            document.querySelector('#suspects').innerHTML += `
                <div itemid=${suspect.id} class="suspect-info">
                    <h2 class="suspect-name">${suspect.name}</h2>
                    <img draggable="false" alt="suspect-image" src=${suspect.imgSrc}>
                </div>
            `
        })
    })

}
