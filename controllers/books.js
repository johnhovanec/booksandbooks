const Book = require('../models/Book.js');
const limit = 6;              // Limit to show 6 books per page max
var pageMin;
var pageMax;
var pageNum;
const itemsPerPage = 6;
var total;

Book.count({}, function(err, count){      // Get count of total number of books in collection
  total = count;
});

 exports.index = (req, res) => {
  pageMin = parseInt(req.params.pageMin);
  if (isNaN(pageMin)) {       // Need this in case param is missing we'll set it to 0
    pageMin = 0;
  }
  pageMax = pageMin + itemsPerPage;
  pageMax < total ? pageMax : pageMax = total;

  Book.find((err, docs) => {
    res.render('books', { books: docs, pageMin: pageMin, pageMax: pageMax, total: total });
  }).skip(pageMin).limit(itemsPerPage);       // set paging limits
};

// Handles Ajax paging for Next button
 exports.pageNext = (req, res) => {
  pageMin = pageMin + itemsPerPage;
  pageMax = pageMin + itemsPerPage;
  pageMax < total ? pageMax : pageMax = total;

  Book.find((err, docs) => {    
    return res.json({ books: docs, pageMin: pageMin, pageMax: pageMax, total: total });
  }).skip(pageMin).limit(itemsPerPage);                 // set paging limits
};

// Handles ajax paging for Prev button
 exports.pagePrev = (req, res) => {
  pageMin = pageMin - itemsPerPage;
  pageMin < 0 ? pageMin = 0 : pageMin;
  pageMax = pageMin + itemsPerPage;

  Book.find((err, docs) => {    
    return res.json({ books: docs, pageMin: pageMin, pageMax: pageMax, total: total });
  }).skip(pageMin).limit(itemsPerPage);                 // set paging limits
};

/* POST to create a new book */
 exports.create = (req, res, next) => {
  // create a new instance of the Book model
  var book = new Book();

  // set the books properties 
  book.prodID = req.body.prodID;
  book.ISBN = req.body.ISBN;
  book.title = req.body.title;
  book.authorFName = req.body.authorFName;
  book.authorLName = req.body.authorLName;
  book.publisher = req.body.publisher;
  book.length = req.body.length;
  book.pubDate = req.body.pubDate;
  book.imgPath = req.body.imgPath;
  book.blurb = req.body.blurb;
  book.price = req.body.price;

  // save the data received
  book.save(function(err) {
    if (err) 
        res.send(err);
    res.render('books/detail', { book: book });
  });
};


/* GET book by id. */
 exports.detail = (req, res, next) => {
 Book.findById(req.params.book_id, (err, book) => {
    if (err) { return next(err); }
    res.render('books/detail', { book: book });
  });
};
