const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const routes = require('./config/routes');

const db = process.env.MONGODB_URI || 'mongodb://localhost/atthack';
// mongoose.connect(db);
var promise = mongoose.connect(db, {
	useMongoClient: true,
});

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(routes);

const d3 = require('d3-request');

const getContent = () => {
	console.log('hello');
	d3.tsv('http://localhost:8080/Hackathon-Contents.tsv', function(data) {
		data.map(movie => {
			if (movie.CONTENT_TYPE = 'FEATURE')
				console.log(movie);
		})
	});
}

// getContent();

const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening to ${port}`);