const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
	title: String,
	rating: String,
	cid: String,
	image: String,
	year: Number,
	genre: [String],
	talent: [{
		name: String,
		role: String
	}]
});

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;