"use strict";

let MOTIVES = null
let CARS = null

const WITHOUT_ALIBI = [
    "93c0334f-754b-4ee8-bb45-4dd5c24470b4",
    "3295122c-c10a-4ac2-9951-e2ebe4731f16",
    "01a25297-1671-411f-8489-c45a87b905b7",
    "9078bbfc-715c-439a-baa3-1407d5db7b49"
]

function getAllMotives(cb) {
    if (MOTIVES !== null) return cb(null, MOTIVES);

    const localMotives = localStorage.getItem("hackthefuture-motives");
    if (localMotives !== null) {
        MOTIVES = JSON.parse(localMotives)
        return cb(null, JSON.parse(localMotives));
    }

    getRequest('motive', (err, result) => {
        if (err) { console.error(err); return cb(err) }
        MOTIVES = result;
        localStorage.setItem("hackthefuture-motives", JSON.stringify(result));
        return cb(null, result)
    })
}

function getAllCars(cb) {
    if (CARS !== null) return cb(null, CARS);

    const localCars = localStorage.getItem("hackthefuture-cars");
    if (localCars !== null) {
        CARS = JSON.parse(localCars)
        return cb(null, JSON.parse(localCars));
    }

    getRequest('car', (err, result) => {
        if (err) { console.error(err); return cb(err) }
        CARS = result;
        localStorage.setItem("hackthefuture-cars", JSON.stringify(result));
        return cb(null, result)
    })
}


function calculateSuspicion(suspect) {
    if (MOTIVES === null) return console.log("MOTIVES NULL");
    if (CARS === null) return console.log("CARS NULL");

    let suspectSuspicion = 0;

    const suspectMotive = MOTIVES.filter(motive => motive.suspectId === suspect.id);
    const suspectCar = CARS.filter(car => car.owner === suspect.name);

    // Calculate Suspicion based on motives
    if (suspectMotive.length > 0) suspectSuspicion += 5;
    else suspectSuspicion -= 3;

    // Calculate Suspicion based on cars
    if (suspectCar.length > 0) {
        const SIGHTING_CAR_LOCAL = localStorage.getItem(`hackthefuture-sighting-car-${suspectCar[0].licenseplate}`);

        if (SIGHTING_CAR_LOCAL === null) {
            getRequest( `sighting/car/${suspectCar[0].licenseplate}`, (err, result) => {
                if (err) return console.log(err)
                if (result[0]) {
                    localStorage.setItem(`hackthefuture-sighting-car-${suspectCar[0].licenseplate}`, JSON.stringify(result[0]))

                    const carLeaveTime = parseInt(result[0].endTime.split(':')[0]);

                    if (carLeaveTime < 24 && carLeaveTime > 6) suspectSuspicion -= 50
                    else if (carLeaveTime < 1) suspectSuspicion -= 50

                    calcAlibi(suspect, suspectSuspicion)
                }
            })
        } else {
            const carLeaveTime = parseInt(JSON.parse(SIGHTING_CAR_LOCAL).endTime.split(':')[0]);

            if (carLeaveTime < 24 && carLeaveTime > 6) suspectSuspicion -= 50
            else if (carLeaveTime < 1) suspectSuspicion -= 50

            calcAlibi(suspect, suspectSuspicion)
        }
    }
}

function calcAlibi(suspect, suspectSuspicion) {
    if (WITHOUT_ALIBI.includes(suspect.id)) suspectSuspicion += 3
    else suspectSuspicion -= 3;

    console.log(suspect.name + " is " + suspectSuspicion + " suspicion.")
}