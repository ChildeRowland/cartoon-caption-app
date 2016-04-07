var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testDb', function () {
	// mongoose.connection.db.dropDatabase();
});

var Schema = mongoose.Schema;

var captionSchema = new Schema({
	text: String,
	votes: { type: Number, default: 0 }
}, { timestamps: true });

var imageSchema = new Schema({
	location: String,
	description: String,
	//src: { data: Buffer, contentType: String }
	captions: [captionSchema]
});

module.exports = mongoose.model('image', imageSchema);