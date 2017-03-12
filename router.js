'user strict';

const express = require('express');

module.exports = function (app) {

	var apiRoute = express.Router();

	app.use('/api', apiRoute);
};