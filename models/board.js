var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Board = new Schema({
	name: { type: String, required: true},
	description: String
});

module.exports = mongoose.model('Board', Board);