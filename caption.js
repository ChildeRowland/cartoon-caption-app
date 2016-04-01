var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testDb', function () {
	// mongoose.connection.db.dropDatabase();
});

var Schema = mongoose.Schema;

var captionSchema = new Schema({
	text: String,
	meta: {
		votes: Number
	}
}, { timestamps: true });

module.exports = mongoose.model('caption', captionSchema);

/*
parent_id

*/