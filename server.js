var express 	= require('express');
var app 		= express();
var router 		= express.Router();
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.set('views', __dirname + '/client');
	app.use('/assets', express.static(__dirname + '/client'));

var bodyParser 	= require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({"extended" : false}));

var mongoOp 	= require('./models/image.js');
var imageRoutes = require('./routes/image.js');

var port = process.env.PORT || 3000;


app.get('/', function (req, res) {
	res.render('index.html');
});

imageRoutes(router);

app.use('/', router);

app.listen(port);
console.log("Listening to PORT " + port);

