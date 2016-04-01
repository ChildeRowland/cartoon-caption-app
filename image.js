var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testDb');

var Schema = mongoose.Schema;

// var image = new Schema({
// 	img: { data: Buffer, contentType: String }
// });

var captionSchema = new Schema({
	text: String,
	meta: {
		votes: Number
	}
}, { timestamps: true });

var imageSchema = new Schema({
	img: String,
	captions: [captionSchema]
});

module.exports = mongoose.model('image', imageSchema);