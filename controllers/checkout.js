const Cart = require('../models/Cart.js');

// /* GET Checkout page. */
// exports.index = (req, res) => {
//   res.render('checkout', {
//     title: 'Checkout'
//   });
// };


// AJAX post to change quantity
exports.ajaxPostQuantity = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  //res.send("This is an ajax test");
  console.log("In ajaxPost test ...");

   // passed in from ajax request
   var quantity = req.body.quantity;
   var index = req.body.index;
   var userID = req.body.userID;
   console.log("quantity = " + quantity + "  index = " + index + "  userID = " + userID);

  // Find a user cart
  Cart.findOne({"userID": userID }, (err, cart) => {
    if (err) { return next(err); }
    console.log("In ajaxPost: orig quanity = " + cart.items[index].quantity);
    cart.items[index].quantity = quantity;
    console.log("new quanity = " + cart.items[index].quantity);

    cart.save((err) => {
      if (err) { 
        return next(err); 
      } else {
        req.flash('success', { msg: 'Your cart has been updated.' });
      }
      //req.flash('success', { msg: 'Ajax quantity has been updated.' });
      //res.redirect('/cart/' + existingCart.userID);
    });
  });
};


// AJAX post to change quantity
exports.ajaxPostRemove = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("In ajaxPostRemove test ...");

   // passed in from ajax request
   var index = req.body.index;
   var userID = req.body.userID;
   console.log("Remove  index = " + index + "  userID = " + userID);

  //Find a user cart
  Cart.findOne({"userID": userID }, (err, cart) => {
    if (err) { return next(err); }
    console.log("In ajaxPostRemove: orig items length = " + cart.items.length);
    cart.items.splice(index, 1);
    console.log("ajax PostRemove new length = " + cart.items.length);

    cart.save((err) => {
      if (err) { 
        return next(err); 
      } else {
        req.flash('success', { msg: 'Item has been removed from cart.' });
      }
      //req.flash('success', { msg: 'Ajax quantity has been updated.' });
      //res.redirect('/cart/' + existingCart.userID);
    });
  });
};


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
