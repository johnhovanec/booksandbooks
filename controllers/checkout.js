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

    cart.subTotal = 0;      // Reset it each time to be safe
    cart.taxAmount = 0;
    cart.shippingAmount = 0;
    cart.total = 0;
    console.log("< Subtotal = " + cart.subTotal);  
    console.log("< Tax = " + cart.taxAmount);
    console.log("< Shipping = " + cart.shippingAmount);
    console.log("< Total = " + cart.total); 
    // loop through items in cart to calculate subtotal, total, etc.
    for (var i = 0; i < cart.items.length; i++) {
      console.log(" prices in cart = " + cart.items[i].price);
      cart.subTotal += cart.items[i].price * cart.items[i].quantity;
    }
    cart.taxAmount = (cart.subTotal * cart.taxRate).toFixed();                    // Apply MD state tax
    if (cart.subTotal > 5000 ) {                 // Shipping over $50 is free, otherwise it's a flate rate 
    } else {
      cart.shippingAmount = 795;
    }
    cart.total = cart.subTotal + cart.taxAmount + cart.shippingAmount; 
    console.log("Subtotal = " + cart.subTotal/100);  
    console.log("Tax = " + cart.taxAmount);
    console.log("Shipping = " + cart.shippingAmount/100);
    console.log("Total = " + cart.total/100); 
    console.log("In checkout: userID = " + cart.userID)

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
  } else {
    req.flash('success', { msg: 'Your order has been placed.' });
    res.redirect('confirmation', {});
  }


};


// /* GET /checkout/confirmation page. */
 exports.getConfirmation = (req, res) => {
  console.log("Order confirmation");
  if (err) {
    res.send(err);
  }
  res.render('checkout/confirmation');
};
