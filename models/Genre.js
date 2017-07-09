const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
	cid: String,
	genre: String
});

const Genre = mongoose.model('Genre', GenreSchema);

module.exports = Genre;