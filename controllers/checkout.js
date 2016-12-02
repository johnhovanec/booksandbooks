const Cart = require('../models/Cart.js');

// /* GET Checkout page. */
// exports.index = (req, res) => {
//   res.render('checkout', {
//     title: 'Checkout'
//   });
// };


// /* GET cart by userID. */
 exports.index = (req, res, next) => {
 Cart.findOne({"userID": req.params.userID }, (err, cart) => {
    if (err) { 
      return next(err); 
    }

    cart.subTotal = 0;      // Let's reset it each time
    // loop through items in cart to calculate subtotal, total, etc.
    for (var i = 0; i < cart.items.length; i++) {
      console.log(" prices in cart = " + cart.items[i].price);
      cart.subTotal += cart.items[i].price * cart.items[i].quantity;
    }
    console.log("Subtotal = " + cart.subTotal);
    //cart.subTotal = parseFloat(cart.subTotal) + (parseFloat(req.body.price)* parseInt(req.body.quantity));   // Need to parseFloat to avoid validation error
    cart.taxAmount = cart.subTotal * cart.taxRate;                    // Apply MD state tax
    if (cart.subTotal > 50.00 ) {                                                     // Shipping over $50 is free, otherwise it's a flate rate   existingCart.shippingRate = 0.00;
    } else {
      cart.shippingAmount = 7.95;
    }
    cart.total += cart.subTotal + cart.taxAmount + cart.shippingAmount;    // Calculate total
    console.log("In checkout: userID = " + req.body.userID)
    res.render('checkout', { carts: cart });
  });
};


/**
 * Post order /checkout/confirmation
 */
exports.postConfirmation = (req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
  console.log("In checkout postConfirmation");

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/cart/userID');
  }

};
