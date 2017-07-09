const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
	title: String,
	rating: String,
	cid: String,
	image: String,
	year: Number,
	genre: [String]
});

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;