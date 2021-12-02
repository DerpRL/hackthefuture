"use strict";

document.addEventListener("DOMContentLoaded", init)

function init() {
    getAllMotives((err, _) => { if (err) console.log(err);
        getAllCars((err, _) => { if (err) console.log(err);
            loadAllSuspects();
        })
    })
}

function loadAllSuspects() {

    getRequest('suspect', (err, result) => {
        if (err) console.error("Error getting the suspects.");

        result.forEach(suspect => {
            document.querySelector('#suspects').innerHTML += `
                <div itemid=${suspect.id} class="suspect-info">
                    <h2 class="suspect-name">${suspect.name}</h2>
                    <p>Verdachtheid: 0</p>
                    <img draggable="false" alt="suspect-image" src=${suspect.imgSrc}>
                </div>
            `
            calculateSuspicion(suspect)
        })

    })

}
