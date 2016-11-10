const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  isbn: String,
  title: String,
  authorFName: String,
  authorLName: String,
  publisher: String,
  length: String,
  pubDate: String,
  imgPath: String,
  price: Number
  
}, { timestamps: true });


const Book = mongoose.model('book', bookSchema);

module.exports = Book;
