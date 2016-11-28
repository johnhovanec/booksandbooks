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
  
  // Look for an existing cart linked to the userID
  // Cart.findOne({ "userID": req.body.userID }, (err, existingCart) => {
  //   if (err) { return next(err); }
  //   console.log("In cart updateItem: userID = " + req.body.userID);
  //   if (!existingCart) {
  //     req.flash('errors', { msg: 'Cart does not exists.' });
  //     return res.redirect('/books');
  //   } else {
  //       //var index = req.body.index;
  //       console.log("in updateItem Index = " + index);
  //       var index = req.body.index;
  //       var updatedQuanity = req.body.quantity;
  //       console.log("In updateItem: passed in updatedQuanity = " + updatedQuanity);
  //       existingCart.items[index].quantity = updatedQuanity;
  //       existingCart.save((err) => {
  //         if (err) { return next(err); }
  //         req.flash('success', { msg: 'Item quantity has been updated.' });
  //         res.redirect('/cart/' + existingCart.userID);
  //       });
  //     }
  //   }); 
};
