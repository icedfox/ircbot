/*
 *  Dependencies
 */

// const config = require('config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/*
 * Server Configuration
 */
app.use(bodyParser.urlencoded({
	limit: '10mb',
	extended: true
}));

app.use(bodyParser.json({
	limit: '10mb'
}));

// TBI
var port = process.env.PORT || 5000;


/*
 * Routers
 */
var router = require('./router');
router(app);

/*
 * Server starting
 */
app.listen(port, function () {
	console.log('Running on port %s', port, {
		meta: 'meta'
	});
});
