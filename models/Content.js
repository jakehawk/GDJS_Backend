const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
	title: String,
	rating: String,
	cid: String,
	image: String
});

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;