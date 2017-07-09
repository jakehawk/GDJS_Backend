const mongoose = require('mongoose');

const Content = require('../models/Content');
const Genre = require('../models/Genre');
const Talent = require('../models/Talent');
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
	}, 20000);
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
	movie.talent = [];
	Genre.find({ cid: content.CID }, (err, genre) => {
		if (Array.isArray(genre)) {
			genre.map(indivGenre => {
				movie.genre.push(indivGenre.genre);
			});
		}
	})
	Talent.find({ cid: content.CID }, (err, talent) => {
		let newTalent;
		talent.map(indivTalent => {
			newTalent = {};
			newTalent.name = indivTalent.name;
			newTalent.role = indivTalent.role;
			movie.talent.push(newTalent);
		})
		console.log(movie.talent);
	})
	movies.push(movie);
}




