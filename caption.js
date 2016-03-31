var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testDb');

var mongoSchema = mongoose.Schema;

var captionSchema = {
	"text": String,
};

module.exports = mongoose.model('caption', captionSchema);