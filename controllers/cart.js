const Cart = require('../models/Cart.js');

/* GET / Cart page. */
 exports.index = (req, res) => {
  Cart.find((err, docs) => {
    res.render('cart', { carts: docs, title: 'Shopping Cart' });
  });
};


/* GET cart by userID. */
 exports.detail = (req, res, next) => {
 Cart.findOne({"userID": req.params.userID }, (err, cart) => {
    if (err) { return next(err); }
    res.render('cart/detail', { carts: cart });
    //res.send(book);
    //res.json(book);
  });
};



/**
 * POST /cart
 * Create a new cart if it does not exist.
 */
exports.postAddToCart = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("In cart.js postAddToCart");

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/books');
  }
  
  // Look for an exiting cart linked to the userID
  Cart.findOne({ "userID": req.body.userID }, (err, existingCart) => {
    if (err) { return next(err); }
    console.log("In postAddToCart: userID = " + req.body.userID);
    
    if (!existingCart) {
      req.flash('errors', { msg: 'Cart does not exists.' });
      return res.redirect('/books');
    } else {
        existingCart.items.push({
                          ISBN: req.body.ISBN,
                          title: req.body.title,
                          price: req.body.price,
                          quantity: req.body.quantity
                        });
        existingCart.save((err) => {
          if (err) { return next(err); }
          // req.logIn(cart, (err) => {
          //   if (err) {
          //     return next(err);                  
          //   }
          //   res.redirect('/');
          // });
          req.flash('success', { msg: 'Your cart has been updated.' });
          res.redirect('/cart/' + existingCart.userID);
        });
      }
        
    // if (existingCart) {
    //   req.flash('errors', { msg: 'Cart already exists!' });
    //   //return res.redirect('/cart');
    //   console.log("Found a cart for user");
    //   //res.render('cart/detail', { cart: cart });

    //   // Push new items into items []

    }); 
};


/**
 * Delete item from cart.
 */
exports.deleteItem = (req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
  console.log("In cart.js deleteItem");

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/cart/userID');
  }
  
  // Look for an exiting cart linked to the userID
  Cart.findOne({ "userID": req.body.userID }, (err, existingCart) => {
    if (err) { return next(err); }
    console.log("In cart deleteItem: userID = " + req.body.userID);
    if (!existingCart) {
      req.flash('errors', { msg: 'Cart does not exists.' });
      return res.redirect('/books');
    } else {
        //existingCart.items[index].splice(1, 1);
        var index = req.body.index;
        console.log(" Index = " + index);
        existingCart.items.pop();
        existingCart.save((err) => {
          if (err) { return next(err); }
          // req.logIn(cart, (err) => {
          //   if (err) {
          //     return next(err);                  
          //   }
          //   res.redirect('/');
          // });
          req.flash('message', { msg: 'Item has been removed from cart.' });
          res.redirect('/cart/' + existingCart.userID);
        });
      }
    }); 
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



