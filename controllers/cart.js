const Cart = require('../models/Cart.js');

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
      existingCart = new Cart({
        userID: req.body.userID
      });
    } //else {
        existingCart.subTotal += req.body.price;
        existingCart.taxAmount = existingCart.subTotal * existingCart.taxRate;    // Apply MD state tax
        if (existingCart.subTotal > 50.00 ) {                                     // Shipping over $50 is free, otherwise it's 12% of subTotal
            existingCart.shippingRate = 0;
        } else {
          existingCart.shippingRate = existingCart.subTotal * 0.12;
        }
        existingCart.shippingAmount = existingCart.subTotal * existingCart.shippingRate;                       //Add shipping to subTotal
        existingCart.total += existingCart.subTotal + existingCart.taxAmount + existingCart.shippingAmount;    // Calculate total
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
      //}
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
        var index = req.body.index;
        console.log(" Index = " + index);
        //existingCart.items.pop();
        existingCart.items.splice(index, 1);
        existingCart.save((err) => {
          if (err) { return next(err); }
          // req.logIn(cart, (err) => {
          //   if (err) {
          //     return next(err);                  
          //   }
          //   res.redirect('/');
          // });
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
          // req.logIn(cart, (err) => {
          //   if (err) {
          //     return next(err);                  
          //   }
          //   res.redirect('/');
          // });
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



