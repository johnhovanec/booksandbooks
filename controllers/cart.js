const Cart = require('../models/Cart.js');

/* GET / Login for cart page. Only logged in users can view their cart */
 exports.getLogin = (req, res) => {
  req.flash('message', { msg: 'You must login to view your shopping cart' });
  res.redirect('/login');
};


// /* GET cart by userID. */
 exports.detail = (req, res, next) => {
  Cart.findOne({"userID": req.params.userID }, (err, cart) => {
    if (err) { return next(err); }
    res.render('cart/detail', { carts: cart });
  });
};


// Handles Angular AJAX request to get items in cart
exports.getItems = (req, res) => {
   // passed in from ajax request
   var userID = req.query.userID;
   console.log("In getItems userID =" + userID);

  // Find a user cart
  Cart.findOne({"userID": userID }, (err, cart) => {
    if (err) { return next(err); }
    return res.json({ cart: cart });
  });
};


/**
 * POST /cart
 * Create a new cart if it does not exist, add items to the cart.
 */
exports.postAddToCart = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/books');
  }
  
  // Look for an existing cart linked to the userID
  Cart.findOne({ "userID": req.body.userID }, (err, existingCart) => {
    if (err) { return next(err); }
    
    if (!existingCart) {
      existingCart = new Cart({
        userID: req.body.userID
      });
    } 
    existingCart.items.push({
                              ISBN: req.body.ISBN,
                              title: req.body.title,
                              price: req.body.price,
                              quantity: req.body.quantity
                            });
    existingCart.save(function(err,resp) {
    if(err) {
      return next(err);
    } else {
      req.flash('success', { msg: 'Your cart has been updated.' });
      res.redirect('/cart/' + existingCart.userID);
    }           
    });
  }); 
};


// AJAX post to change quantity
exports.ajaxPostQuantity = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

   // passed in from ajax request
   var quantity = req.body.quantity;
   var index = req.body.index;
   var userID = req.body.userID;

   console.log("ajaxPostQuantity  quantity = " + quantity + " index = " + index + " userID = " + userID);
  // Find a user cart
  Cart.findOne({"userID": userID }, (err, cart) => {
    if (err) { return next(err); }
    cart.items[index].quantity = quantity;

    cart.save((err) => {
      if (err) { 
        return next(err); 
      } else {
        req.flash('success', { msg: 'Your cart has been updated.' });
      }
    });
  });
};



// AJAX post to change quantity
exports.ajaxPostRemove = (req, res, next) => {
  //res.header("Access-Control-Allow-Origin", "*");

   // passed in from ajax request
   debugger;
   var index = req.body.index;
   var userID = req.body.userID;

   console.log("ajaxPostRemove: index = " + index + " userID = " + userID); 

  //Find a user cart
  Cart.findOne({"userID": userID }, (err, cart) => {
    if (err) { return next(err); }
    if ( cart.items.length === 1) {
      console.log("Last one in items")
      cart.items[0] = "";
    } else {
      cart.items.splice(index, 1);
    }

    cart.save((err) => {
      if (err) { 
        return next(err); 
      } else {
      }
    });
  });
};



/**
 * Delete item from cart.
 */
exports.deleteItem = (req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/cart/userID');
  }
  
  // Look for an existing cart linked to the userID
  Cart.findOne({ "userID": req.body.userID }, (err, existingCart) => {
    if (err) { return next(err); }
    console.log("In cart deleteItem: userID = " + req.body.userID);
    if (!existingCart) {
      req.flash('errors', { msg: 'Cart does not exists.' });
      return res.redirect('/books');
    } else {
        var index = req.body.index;               // Index relates to the position within the items array
        existingCart.items.splice(index, 1);
        existingCart.save((err) => {
          if (err) { return next(err); }
          req.flash('success', { msg: 'Item has been removed from shopping cart.' });
          res.redirect('/cart/' + existingCart.userID);
        });
      }
    }); 
};


/**
 * Update item in cart.
 */
exports.updateItem = (req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/cart/userID');
  }
  
  // Look for an existing cart linked to the userID
  Cart.findOne({ "userID": req.body.userID }, (err, existingCart) => {
    if (err) { return next(err); }
    if (!existingCart) {
      req.flash('errors', { msg: 'Cart does not exists.' });
      return res.redirect('/books');
    } else {
        var index = req.body.index;
        var updatedQuanity = req.body.quantity;
        existingCart.items[index].quantity = updatedQuanity;
        existingCart.save((err) => {
          if (err) { return next(err); }
          req.flash('success', { msg: 'Item quantity has been updated.' });
          res.redirect('/cart/' + existingCart.userID);
        });
      }
    }); 
};

/* GET Cart/Checkout page. */
 exports.getCheckout = (req, res, next) => {
  Cart.find((err, docs) => {
    res.render('cart/checkout', { 
      cart: docs,
      title: 'Checkout'
    });
  });
};
