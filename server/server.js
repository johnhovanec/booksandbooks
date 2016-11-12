
// Import the Modules
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

// configure app
app.use(bodyParser());

var port     = process.env.PORT || 3000; // where the application will run

// Import Mongoose
var mongoose   = require('mongoose');

// connect to our database
mongoose.connect('mongodb://localhost:27017/Books');
//mongoose.connect('mongodb://feiochc:hate666!@kahana.mongohq.com:10073/node-api');

var books     = require('./server/models/books');

// Defining the Routes for our API

// Start the Router
var router = express.Router();

// A simple middleware to use for all Routes and Requests
router.use(function(req, res, next) {
	// Give some message on the console
	console.log('An action was performed by the server.');
    // Is very important using the next() function, without this the Route stops here.
	next();
});

// Default message when access the API folder through the browser
router.get('/', function(req, res) {
    // Give some Hello there message
	res.json({ message: 'Hello SPA, the API is working!' });
});

// When accessing the books Routes
router.route('/books')

	// create a book when the method passed is POST
	.post(function(req, res) {

        // create a new instance of the Book model
		var book = new Book();

        // set the book properties (comes from the request)
		book.id = req.body.id;
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

            // give some success message
			res.json({ message: 'book successfully created!' });
		});
	})

	// get all the books when a method passed is GET
	.get(function(req, res) {
		Book.find(function(err, books) {
			if (err)
				res.send(err);

			res.json(books);
		});
	});

// on accessing book Route by id
router.route('/books/:book_id')

	// get the book by id
	.get(function(req, res) {
		Book.findById(req.params.book_id, function(err, book) {
			if (err)
				res.send(err);
			res.json(book);
		});
	})

	// update the book by id
	.put(function(req, res) {
		Book.findById(req.params.book_id, function(err, book) {

			if (err)
				res.send(err);

            // set the properties 
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

                // give some success message
				res.json({ message: 'book successfully updated!' });
			});

		});
	})

	// delete the book by id
	.delete(function(req, res) {
		Book.remove({
			_id: req.params.book_id
		}, function(err, book) {
			if (err)
				res.send(err);

            // give some success message
			res.json({ message: 'book successfully deleted!' });
		});
	});


// register the route
app.use('/api', router);

// start the server
app.listen(port);
console.log('Magic happens on port ' + port);
