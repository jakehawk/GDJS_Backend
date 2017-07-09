const express = require('express');
const router = express.Router();

const Content = require('../models/Content');

const randomContent = () => {
	min = Math.ceil(0);
  max = Math.floor(832);
  return Math.floor(Math.random() * (max - min)) + min;
}

const randomGenre = (numOfMovies) => {
	min = Math.ceil(0);
	max = Math.floor(numOfMovies);
	return Math.floor(Math.random() * (max - min)) + min;
}

router.route('/')
	.get((req, res) => {
		res.json({ routes: [
			{ getAll: '/movies' },
			{ getRandom: '/movie/random' },
			{ getMovie: '/movie/:name' },
			{ getGenre: '/:genre' }
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
			let randomMovie = movies[randomContent()];
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

		Content.find({ genre }, (err, movies) => {
			let randomMovie = movies[randomGenre(movies.length)];
			res.json({ randomMovie });
		})
	});


module.exports = router;