"use strict";

const nodeFetch = require('node-fetch');


const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
        'Content-Type': 'application/json',
    }
};

function getAllSuspects(cb=null) {
    nodeFetch('https://htf-2021.zinderlabs.com/suspect', requestOptions).then(response => {
        response.json().then(jsonResponse => {
            console.log(jsonResponse)
        }).catch(err => console.error(err))
    }).catch(err => console.error(err))
}

getAllSuspects()
