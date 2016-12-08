const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	prodID:       	{ type: Number, default: '' },
	ISBN:         	{ type: String, default: '' },
	title:        	{ type: String, default: '' },
	authorFName:  	{ type: String, default: '' },
	authorLName:  	{ type: String, default: '' },
	publisher:    	{ type: String, default: '' },
	length:       	{ type: String, default: '' },
	format:       	{ type: String, default: '' },
	pubDate:      	{ type: String, default: '' },
	imgPath:      	{ type: String, default: '' },
	blurb:        	{ type: String, default: '' },
	price:   	     	{ type: Number, default: 0  },
	inventory:   		{ type: Number, default: 0  },
	showAsFeatured:	{ type: Number, default: 0  },
	createdOn:    	{ type: Date,   default: Date.now}
});

const book = mongoose.model('book', bookSchema);
module.exports = book;

// var mongoose     = require('mongoose');
// var Schema       = mongoose.Schema;


// var BookSchema   = new Schema({
//     prodID:       { type: Number, default: '' },
// 	ISBN:         { type: String, default: '' },
// 	title:        { type: String, default: '' },
// 	authorFName:  { type: String, default: '' },
// 	authorLName:  { type: String, default: '' },
// 	publisher:    { type: String, default: '' },
// 	length:       { type: String, default: '' },
// 	pubDate:      { type: String, default: '' },
// 	imgPath:      { type: String, default: '' },
// 	blurb:        { type: String, default: '' },
// 	price:        { type: Number, default: 0  },
//     createdOn:    { type: Date,   default: Date.now}
// });

// module.exports = mongoose.model('Book', BookSchema);


// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//   id: { type: String, unique: true },
//   ISBN: String,
//   title: String,
//   authorFName: String,
//   authorLName: String,
//   publisher: String,
//   length: String,
//   pubDate: String,
//   imgPath: String,
//   price: Number
  
// }, { timestamps: true });


// const Book = mongoose.model('book', bookSchema);

// module.exports = Book;
