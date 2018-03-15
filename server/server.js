const express = require('express');
const axios = require('axios');

app.use(express.static('dist'));
app.use(express.static('public'));

module.exports = app;