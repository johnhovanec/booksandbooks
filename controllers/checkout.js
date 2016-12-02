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
    if (err) { return next(err); }
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
