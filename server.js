var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var searchController = require('./searchController');
var mongoose = require('mongoose');

var MONGODB_URI = process.env.database || 'mongodb://localhost/imagesearch';
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log("Successfully connected to mongodb!")
})

mongoose.connect(MONGODB_URI);

app.get('/', function (req, res) {
	res.send("Hello");
});

app.get('/api/imagesearch/:query', searchController.runSearch);
app.get('/api/lastest/imagesearch', searchController.getLatest);

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT + '!');
});