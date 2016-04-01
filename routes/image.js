var express 	= require('express');
var app 		= express();
var router 		= express.Router();
var bodyParser 	= require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({"extended" : false}));
var mongoOp 	= require('../models/image.js');


module.exports = function (router) {

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
						response = {"error" : true, "message" : "Error fetching the image document"};
					} else {
						doc.captions.push({ text: req.body.text});
						doc.save();
						response = {"error" : false, "message" : doc};
					}
				res.json(response);
			})
		})

		.get(function (req, res) {
			var id = req.params.id;

			var response = {};
			mongoOp.findById(id, function (error, doc) {
				if ( error ) {
					response = {"error" : true, "message": "error fetching the image document"};
				} else {
					response = {"error" : false, "message": doc.captions};
				}
				res.json(response);
			})
		});

};