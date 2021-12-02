"use strict";

const nodeFetch = require('node-fetch');


const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
        'Content-Type': 'application/json',
    }
};

function getAllSuspects(cb) {
    nodeFetch('https://htf-2021.zinderlabs.com/suspect', requestOptions).then(response => {
        response.json().then(jsonResponse => {
            console.log(jsonResponse)
            return cb(null, jsonResponse)
        }).catch(err => { console.error(err); return cb(err) })
    }).catch(err => { console.error(err); return cb(err) })
}

module.exports = {
    getAllSuspects
}
