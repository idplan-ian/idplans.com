/* general requirements */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();


/* standard http stuff */
app.use(logger({
	format: 'dev',
	immediate: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, '/')));

/* create the server */
var server = http.createServer(app);


/* add cors headers */
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token');
	//for now we are caching images,css,stencils,libs and JSON call data that will not modifiy
	// if ((req.path.indexOf("/rpm/images") != -1 || req.path.indexOf("/rpm/css") != -1 || req.path.indexOf("/rpm/stencils") != -1 || req.path.indexOf("/rpm/js/libs") != -1 || req.path.indexOf("/common") != -1)
	//  && (!res.getHeader('Cache-Control') || !res.getHeader('Expires'))) {
	//        res.setHeader("Cache-Control", "public, max-age=345600"); // ex. 4 days in seconds.
	//        res.setHeader("Expires", new Date(Date.now() + 345600000).toUTCString());  // in ms.
	//    }

	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.send(200);
	}
	else {
		next();
	}
});

/* catch all route */
app.use('/*', function(req, res) {
	res.status(404).send();
});

/* START SERVER */
server.listen(8080);
module.exports = app;