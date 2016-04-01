var express 	= require('express');
var app 		= express();
var bodyParser 	= require('body-parser');
var mongoOp 	= require('./image.js');

//var db = require('./db.js');

var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get('/', function (req,res){
    res.json({"error" : false,"message" : "Hello World"});
})

router.route('/images/')

	.get(function (req, res) {
		var response = {};
		mongoOp.find({}, function (error, data) {
			if ( error ) {
				response = {"error" : true, "message": "Error fetching the data"};
			} else {
				response = {"error": false, "message": data};
			}
			res.json(response);
		});
	})

	.post(function (req, res) {
		var db = new mongoOp();
		var response = {};
		db.img = req.body.img;

		db.save(function (error) {
			if ( error ) {
				response = {"error" : true, "message" : "Error adding data"};
			} else {
				response = {"error" : false, "message" : "Caption added"};
			}
			res.json(response);
		});
	});

router.route('/images/:id') 
	.get(function (req, res) {
		var id = req.params.id;

		var response = {};
		mongoOp.findById(id, function (error, data) {
			if ( error ) {
					response = {"error" : true, "message": "Error fetching the data"};
				} else {
					response = {"error": false, "message": data};
				}
			res.json(response);
		})
});

router.route('/images/:id/captions')
	.post(function (req, res) {
		var id = req.params.id;

		var response = {};
		mongoOp.findById(id, function (error, doc) {
			if ( error ) {
					response = {"error" : true, "message": "Error fetching the data"};
				} else {
					//response = {"error": false, "message": data};
					doc.captions.push({ text: req.body.text});
					doc.save();
				}
			res.json(response);
		})
	});

router.route('/captions/')

	.get(function (req, res) {
		var response = {};
		mongoOp.find({}, function (error, data) {
			if ( error ) {
				response = {"error" : true, "message": "Error fetching the data"};
			} else {
				response = {"error": false, "message": data};
			}
			res.json(response);
		});	
	})

	.post(function (req, res) {
		var db = new mongoOp();
		var response = {};
		db.text = req.body.text;

		db.save(function (error) {
			if ( error ) {
				response = {"error" : true, "message" : "Error adding data"};
			} else {
				response = {"error" : false, "message" : "Caption added"};
			}
			res.json(response);
		});
	});



app.use('/', router);

app.listen(3000);
console.log("Listening to PORT 3000");



// db.connect('mongodb://localhost/testDb', function (error) {
// 	if ( error ) {
// 		console.log('Unable to connect to mongo...');
// 		process.exit(1);
// 	} else {
// 		app.listen(3000, function () {
// 			console.log('listening on port 3000...')
// 		});
// 	}
// });