//Define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new mongoose.Schema({
  id:           { type: String, unique: true },
  ISBN:         { type: String, default: '' },
  title:        { type: String, default: '' },
  authorFName:  { type: String, default: '' },
  authorLName:  { type: String, default: '' },
  publisher:    { type: String, default: '' },
  length:       { type: String, default: '' },
  pubDate:      { type: String, default: '' },
  imgPath:      { type: String, default: '' },
  blurb:        { type: String, default: '' },
  price:        { type: Number, default: 0  }
  
  });

module.exports = mongoose.model('Book', BookSchema);