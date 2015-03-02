var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
	name : String,
	artist : String,
	lines : Object,
	difficulty : String
});

module.exports = mongoose.model('Song', songSchema);