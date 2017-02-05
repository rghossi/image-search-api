var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  term: String,
  when: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Search', urlSchema);;