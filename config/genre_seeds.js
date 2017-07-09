const mongoose = require('mongoose');

const Genre = require('../models/Genre');
const genres = require('../movie_assets/genre');

const db = process.env.MONGODB_URI || 'mongodb://localhost/atthack';
mongoose.connect(db);

let stuff = [];

console.log('Wiping Genre DB and reseeding');

Genre.remove({}, (err) => {
	if (err) throw err;

	genres.map(genre => {
		stuff.push({ genre: genre.GENRE, cid: genre.CID });
	});
	Genre.create(stuff, (err, genres) => {
		if (err) throw err;

		mongoose.connection.close();
		process.exit();
	});
});

console.log('DB is now seeded');