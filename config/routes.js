const express = require('express');
const router = express.Router();

const Content = require('../models/Content');

const randomNum = () => {
	min = Math.ceil(0);
  max = Math.floor(832);
  return Math.floor(Math.random() * (max - min)) + min;
}

router.route('/')
	.get((req, res) => {
		res.json({ routes: [
			{ getAll: '/movies' },
			{ getRandom: '/movie/random' },
			{ getMovie: '/movie/:name' }
		]});
	})

router.route('/movies')
	.get((req, res) => {
		Content.find((err, movies) => {
			res.json({ movies });
		})
	})

router.route('/movie/random')
	.get((req, res) => {
		Content.find((err, movies) => {
			let randomMovie = movies[randomNum()];
			res.json({ randomMovie });
		})
	});

router.route('/movie/:title')
	.get((req, res) => {
		const title = req.params.title;
		
		Content.find({ title: title }, (err, movie) => {
			res.json({ movie });
		})
	});


module.exports = router;