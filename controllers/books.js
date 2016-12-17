const Book = require('../models/Book.js');
const limit = 6;              // Limit to show 6 books per page max
var pageMin;
var pageMax;
var pageNum;
const itemsPerPage = 6;
var total;

Book.count({}, function(err, count){      // Get count of total number of books
  total = count;
});
/**
 * GET /
 * Books page.
 */
//  exports.index = (req, res) => {
//   Book.find((err, docs) => {
//     const limit = 6;              // Limit to show 6 books per page max
//     console.log("Book index: skip = " + req.query.skip);
//     console.log("Book index: limit = " + req.query.limit);
//     res.render('books', { books: docs });
//   });
// };
 exports.index = (req, res) => {
  pageMin = parseInt(req.params.pageMin);
  console.log("1 Index controller: pageMin = " + pageMin + " total = " + total);
  if (isNaN(pageMin)) {       // Need this in case param is missing we'll set it to 0
    pageMin = 0;
  }
  pageMax = pageMin + itemsPerPage;
  
  Book.find((err, docs) => {
    console.log("2 Index controller: pageMin = " + pageMin + " pageMax = " + pageMax + " total = " + total);
    
    res.render('books', { books: docs, pageMin: pageMin, pageMax: pageMax, total: total });
  
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




// /* GET book by id. */
// router.get('/:book_id', function(req, res) {
//     Book.findById(req.params.book_id, function(err, book) {
//         if (err)
//             res.send(err);
//         res.json(book);
//     });

// });


// exports.index = (req, res) => {
//   res.render('books', {
//     title: 'Books'
//   });
// };

// exports.create = (req, res) => {
//   res.render('books', {
//     title: 'Books'
//   });
// };

// exports.update = (req, res) => {
//   res.render('books', {
//     title: 'Books'
//   });
// };

// exports.delete = (req, res) => {
//   res.render('books', {
//     title: 'Books'
//   });
// };



  // function Ctrl($scope) {
  //       $scope.submit = function () {
  //           //Make sure to change the host and port to match the URL 
  //           var query = "http://localhost:3000/ReadAll";
  //           $.ajax({ url: query, crossDomain: true, dataType: 'json', type: 'GET' })
  //               .done(function (json) {
  //                   $scope.products = json;
  //                   $scope.$apply();
  //               })
  //               .fail(function () {
  //                   alert("Error");
  //               });
  //       }
  //   }

// app.get("/Read", function(req, res) { res.header("Access-Control-Allow-Origin", "*"); 
// 	var product = {
// "productID": "001",
// "productTitle": "To Kill A Mockingbird", "productISBN" : "927465039476", "productAuthor" : "Harper Lee", "productPublisher" : "Alfred A. Knopf",
// "productActive" : true
// }
// if(!req.query.productID || req.query.productID === 'undefined') {
// return res.send({"result" : "Missing productID in query"}); } else if(req.query.productID != product.productID) {
// return res.send({"result" : "Wrong or unknown productID was entered"}); } else if (product.productActive === true) {
// return res.send(product); } else {
// return res.send({"result" : "This product has been marked as inactive"}); }
// });




// exports.create = (req, res) => {
// //var mongodb = require('mongodb');
// //var MongoClient = mongodb.MongoClient;

//     //res.header("Access-Control-Allow-Origin", "*");
//     if(!req.query.title) {
//         return res.send({"status": "error", "message": "missing book title"});
//     } else {
//     var book = {
//         "id": "0001",
//         "title": req.query.title,
//         "ISBN" : req.query.ISBN,
//         "authorFName" : req.query.authorFName,
//         "authorLName" : req.query.authorLName
//         } //Close 
//         var url = 'mongodb://localhost:27017/books';
//         MongoClient.connect(url, function (err, db) {
//         if (err) {
//           return res.send({"result" : "failed"});
//         } else {
//           var collection = db.collection('products');
// 	  collection.insert(product); 
//           db.close();
//           return res.send({"result" : "Product successfully created"});
//          }  //close if
//         }); //close function
//     } //close else
// }); //Close app.get
