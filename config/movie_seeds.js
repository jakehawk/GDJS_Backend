const mongoose = require('mongoose');

const Content = require('../models/Content');
const Genre = require('../models/Genre');
const contents = require('../movie_assets/content');

const db = process.env.MONGODB_URI || 'mongodb://localhost/atthack';
mongoose.connect(db);

let movies = [];

console.log('Wiping DB and beginning seed');

Content.remove({}, (err) => {
	if (err) throw err;

	contents.map(content => {
		if (content.CONTENT_TYPE === 'FEATURE'){

			getInfo(content);	
		}

	});
	setTimeout(function () {
		Content.create(movies, (err, movies) => {
			if (err) throw err;

			mongoose.connection.close();
			process.exit();
		});
	}, 5000);
});
console.log('DB is now seeded');

const getInfo = (content) => {
	let movie = {};

	movie.title = content.CONTENT_TITLE;
	movie.rating = content.RATING;
	movie.cid = content.CID;
	movie.image = content.POSTER_URL;
	movie.year = content.RELEASE_YEAR;
	movie.genre = [];
	Genre.find({ cid: content.CID }, (err, genre) => {
		if (Array.isArray(genre)) {
			genre.map(indivGenre => {
				movie.genre.push(indivGenre.genre);
			});
		}
	})
	movies.push(movie);
}