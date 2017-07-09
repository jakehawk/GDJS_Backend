const mongoose = require('mongoose');

const Talent = require('../models/Talent');
const talents = require('../movie_assets/talent');

const db = process.env.MONGODB_URI || 'mongodb://localhost/atthack';
mongoose.connect(db);

let stuff = [];

console.log('Wiping Talent DB and reseeding');

Talent.remove({}, (err) => {
	if (err) throw err;

	talents.map(talent => {
		stuff.push({ 
			name: talent.TALENT_NAME, 
			role: talent.ROLE,
			cid: talent.CID 
		});
	});
	Talent.create(stuff, (err, talents) => {
		if (err) throw err;

		mongoose.connection.close();
		process.exit();
	});
});

console.log('Talent DB is now seeded');