const mongoose = require('mongoose');
const d3 = require('d3-request');

const Content = require('../models/Content');

const db = process.env.MONGODB_URI || 'mongodb://localhost/atthack';
mongoose.connect(db);

let movies = [];

console.log('Wiping DB and beginning seed');

Content.remove({}, (err) => {
	if (err) throw err;

	d3.tsv('http://localhost:8080/Hackathon-Contents.tsv', function(data) {
		data.map(content => {
			if (content.CONTENT_TYPE === 'FEATURE' && content.PARENT_CID === '')
				getInfo(content);	
		});
		Content.create(movies, (err, movies) => {
			if (err) throw err;

			mongoose.connection.close();
			process.exit();
		});
	});
});
console.log('DB is now seeded');

const getInfo = (content) => {
	let movie = {};

	movie.title = content.CONTENT_TITLE;
	movie.rating = content.RATING;
	movie.cid = content.CID;
	movie.image = content.POSTER_URL;
	movies.push(movie);
	console.log(movie.title);
}