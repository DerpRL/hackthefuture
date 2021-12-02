"use strict";

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
        'Content-Type': 'application/json',
        'userId': 'jillbridges102'
    }
};

function getRequest(requestString, cb) {
    fetch(`https://htf-2021.zinderlabs.com/${requestString}`, requestOptions).then(response => {
        response.json().then(jsonResponse => {
            return cb(null, jsonResponse)
        }).catch(err => { console.error(err); return cb(err) })
    }).catch(err => { console.error(err); return cb(err) })
}
