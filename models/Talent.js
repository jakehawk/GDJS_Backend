const mongoose = require('mongoose');

const TalentSchema = new mongoose.Schema({
	cid: String,
	name: String,
	role: String
});

const Talent = mongoose.model('Talent', TalentSchema);

module.exports = Talent;