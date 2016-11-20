const Cart = require('../models/Cart.js');

/* GET / Cart page. */
 exports.index = (req, res) => {
  Cart.find((err, docs) => {
    res.render('cart', { carts: docs, title: 'Shopping Cart' });
  });
};


/* GET book by id. */
 exports.detail = (req, res) => {
 Book.findById(req.params.book_id, (err, book) => {
    if (err) { return next(err); }
    res.render('books/detail', { book: book });
    //res.send(book);
    //res.json(book);
  });
};


// /* POST to create a new book */
//  exports.create = (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   // create a new instance of the Book model
//   var cart = new Cart();

//   // set the cart properties 
//   cart.sessionID = req.body.sessionID; 
//   cart.userID = req.body.userID;
//   cart.numberOfItems = req.body.numberOfItems;
//   cart.items = req.body.items;
//   cart.shippingRate = req.body.shippingRate;
//   cart.shippingMethod = req.body.shippingMethod;
//   cart.taxRate = req.body.taxRate;
//   cart.taxAmount = req.body.taxAmount;
//   cart.subTotal = req.body.subTotal;
//   cart.total = req.body.total;

//   // save the data received
//   cart.save(function(err) {
//     if (err)
//         res.send(err);
//   // give some success message
//   res.json({ message: 'cart successfully created!' });
    
//     //res.render('books');
//     //res.render('books/detail', { book: book });
//   });
// };


/**
 * POST /signup
 * Create a new local account.
 */
exports.postAddToCart = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("In cart.js postAddToCart")

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/books');
  }

  const cart = new Cart({
    //book_id: req.body.book_id,
    sessionID: req.body.sessionID,
    items: ({ id: req.body.book_id, title: req.body.title})
    //password: req.body.password
  });

  console.log("In cart book_id = " + cart.items[0].id + " sessionID = " + cart.sessionID);
  // Cart.findOne({ userID: req.body.email }, (err, existingCart) => {
  //   if (err) { return next(err); }
  //   if (existingCart) {
  //     req.flash('errors', { msg: 'Cart already exists!' });
  //     return res.redirect('/cart');
  //   }
    cart.save((err) => {
      if (err) { return next(err); }
      // req.logIn(cart, (err) => {
      //   if (err) {
      //     return next(err);                  //ToDo: try to save a cart record to db
      //   }
      //   res.redirect('/');
      // });
      res.redirect('cart');
    });
  // });
};



/* GET Cart/Checkout page. */
 exports.getCheckout = (req, res) => {
  Cart.find((err, docs) => {
    res.render('cart/checkout', { 
      cart: docs,
      title: 'Checkout'
    });
  });
};

