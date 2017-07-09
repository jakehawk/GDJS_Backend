const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const routes = require('./config/routes');

const db = process.env.MONGODB_URI || 'mongodb://localhost/atthack';
// mongoose.connect(db);
var promise = mongoose.connect(db, {
	useMongoClient: true,
});

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());

app.use(routes);

const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening to ${port}`);