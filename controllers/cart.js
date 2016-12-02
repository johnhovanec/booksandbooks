const Cart = require('../models/Cart.js');

/* GET / Login for cart page. Only logged in users can view their cart */
 exports.getLogin = (req, res) => {
  req.flash('message', { msg: 'You must login to view your shopping cart' });
  res.redirect('/login');
};


/* GET / Cart page. */
 exports.index = (req, res) => {
  Cart.find((err, docs) => {
    res.render('cart', { carts: docs, title: 'Shopping Cart' });
  });
};


// /* GET cart by userID. */
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
 * Create a new cart if it does not exist, add items to the cart.
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
      existingCart = new Cart({
        userID: req.body.userID
      });
    } //else {
    // existingCart.subTotal = parseFloat(existingCart.subTotal) + (parseFloat(req.body.price)* parseInt(req.body.quantity));   // Need to parseFloat to avoid validation error
    // existingCart.taxAmount = existingCart.subTotal * existingCart.taxRate;                    // Apply MD state tax
    // if (existingCart.subTotal > 50.00 ) {                                                     // Shipping over $50 is free, otherwise it's a flate rate        existingCart.shippingRate = 0.00;
    // } else {
    //   existingCart.shippingAmount = 7.95;
    // }
    // existingCart.total += existingCart.subTotal + existingCart.taxAmount + existingCart.shippingAmount;    // Calculate total
    existingCart.items.push({
                              ISBN: req.body.ISBN,
                              title: req.body.title,
                              price: req.body.price,
                              quantity: req.body.quantity
                            });
    // existingCart.save((err) => {       //original save method
    //   if (err) { return next(err); }
    //   req.flash('success', { msg: 'Your cart has been updated.' });
    //   res.redirect('/cart/' + existingCart.userID);
    // });

    existingCart.save(function(err,resp) {
    if(err) {
      return next(err);
    } else {
      req.flash('success', { msg: 'Your cart has been updated.' });
      res.redirect('/cart/' + existingCart.userID);
    }           

    });
      //} //else
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
  
  // Look for an existing cart linked to the userID
  Cart.findOne({ "userID": req.body.userID }, (err, existingCart) => {
    if (err) { return next(err); }
    console.log("In cart deleteItem: userID = " + req.body.userID);
    if (!existingCart) {
      req.flash('errors', { msg: 'Cart does not exists.' });
      return res.redirect('/books');
    } else {
        var index = req.body.index;               // Index relates to the position within the items array
        console.log(" Index = " + index);
        console.log("In deleteItem: item price to delete = " + existingCart.items[index].price);
        //existingCart.items.pop();
        // existingCart.subTotal -= existingCart.items[index].price;     // Subtract deleted item price from cart subtotal
        // existingCart.total -= existingCart.items[index].price;        // Subtract the deleted item price from cart total
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
  console.log("In cart.js updateItem");

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/cart/userID');
  }
  
  // Look for an existing cart linked to the userID
  Cart.findOne({ "userID": req.body.userID }, (err, existingCart) => {
    if (err) { return next(err); }
    console.log("In cart updateItem: userID = " + req.body.userID);
    if (!existingCart) {
      req.flash('errors', { msg: 'Cart does not exists.' });
      return res.redirect('/books');
    } else {
        //var index = req.body.index;
        console.log("in updateItem Index = " + index);
        var index = req.body.index;
        var updatedQuanity = req.body.quantity;
        console.log("In updateItem: passed in updatedQuanity = " + updatedQuanity);
        existingCart.items[index].quantity = updatedQuanity;
        existingCart.save((err) => {
          if (err) { return next(err); }
          req.flash('success', { msg: 'Item quantity has been updated.' });
          res.redirect('/cart/' + existingCart.userID);
        });
      }
    }); 
};


/**
 * POST cart to checkout.
 */
// exports.getCheckout = (req, res, next) => {
//  res.header("Access-Control-Allow-Origin", "*");
//   console.log("In cart.js getCheckout");

//   const errors = req.validationErrors();

//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('/books');
//   }
  
//   // Look for an existing cart linked to the userID
//   Cart.findOne({ "userID": req.body.userID }, (err, existingCart) => {
//     if (err) { return next(err); }
//     console.log("In cart getCheckout: userID = " + req.body.userID);
//     if (!existingCart) {
//       req.flash('errors', { msg: 'Cart does not exist!.' });
//       return res.redirect('/cart/' + req.body.userID);
//     } else {
//         var index = req.body.index;
//         console.log("in getCheckout Index = " + index);
//         //var updatedQuanity = req.body.quantity;
//         //console.log("In updateItem: passed in updatedQuanity = " + updatedQuanity);
//         //existingCart.items[index].quantity = updatedQuanity;
//         existingCart.save((err) => {
//           if (err) { return next(err); }
//           // req.logIn(cart, (err) => {
//           //   if (err) {
//           //     return next(err);                  
//           //   }
//           //   res.redirect('/');
//           // });
//           //req.flash('success', { msg: 'Item quantity has been updated.' });
//           res.redirect('/cart/checkout');
//         });
//       }
//     }); 
// };

/* GET Cart/Checkout page. */
 exports.getCheckout = (req, res, next) => {
  Cart.find((err, docs) => {
    res.render('cart/checkout', { 
      cart: docs,
      title: 'Checkout'
    });
  });
};



