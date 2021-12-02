"use strict";

document.addEventListener("DOMContentLoaded", init)

function init() {
    console.log('Page Loaded')

    loadAllSuspects()
}

function loadAllSuspects() {

    getRequest('suspect', (err, result) => {
        console.log(err)
        console.log(result)
    })
}
