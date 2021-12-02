"use strict";

let MOTIVES = null
let CARS = null

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

function getSightingCar(licensePlate, cb) {
    getRequest( `sighting/car/${licensePlate}`, (err, result) => {
        if (err) return cb(err)
        if (result[0]) {
            console.log('API REQUEST ARRIVED')
            return cb(null, result[0])
        }
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
        console.log("CREATING NEW API REQUEST")

        const SIGHTING_CAR_LOCAL = localStorage.getItem(`hackthefuture-sighting-car-${suspectCar[0].licenseplate}`);

        if (SIGHTING_CAR_LOCAL === null) {
            getSightingCar(suspectCar[0].licenseplate, (err ,result) => {
                if (err) return console.error(err);

                console.log(result)
                localStorage.setItem(`hackthefuture-sighting-car-${suspectCar[0].licenseplate}`, JSON.parse(result))

                const carLeaveTime = parseInt(result.endTime.split(':')[0]);

                if (carLeaveTime < 24 && carLeaveTime > 6) suspectSuspicion -= 50
                else if (carLeaveTime < 1) suspectSuspicion -= 50

                calcAlibi(suspect, suspectSuspicion)
            })
        } else {
            calcAlibi(suspect, suspectSuspicion)
        }
    }
}

function calcAlibi(suspect, suspectSuspicion) {
    console.log(suspect.name + " is " + suspectSuspicion + " suspicion.")
}