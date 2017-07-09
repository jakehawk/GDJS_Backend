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
		
		Content.find({ title }, (err, movie) => {
			res.json({ movie });
		})
	});

router.route('/:genre')
	.get((req, res) => {
		const genre = req.params.genre;

		Content.find({ genre }, (err, movie) => {
			console.log(movie.length);
		})
	});


module.exports = router;