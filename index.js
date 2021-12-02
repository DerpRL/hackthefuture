"use strict";

require('dotenv').config();

// Required Modules
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(__dirname + '/pages'));

// Main route
app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.log(`Now listening to requests on port ${PORT}`);
})
