const Cart = require('../models/Cart.js');

/* GET / Login for cart page. Only logged in users can view their cart */
 exports.getLogin = (req, res) => {
  req.flash('message', { msg: 'You must login to view your shopping cart' });
  res.redirect('/login');
};


// /* GET / Cart page. */
//  exports.index = (req, res) => {
//   Cart.find((err, docs) => {
//     res.render('cart', { carts: docs, title: 'Shopping Cart' });
//   });
// };


// /* GET cart by userID. */
 exports.detail = (req, res, next) => {
  Cart.findOne({"userID": req.params.userID }, (err, cart) => {
    if (err) { return next(err); }
    res.render('cart/detail', { carts: cart });
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
  
  // Look for an existing cart linked to the userID
  Cart.findOne({ "userID": req.body.userID }, (err, existingCart) => {
    if (err) { return next(err); }
    console.log("In postAddToCart: userID = " + req.body.userID);
    
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
        //req.flash('success', { msg: 'Item has been removed from cart.' });
      }
      //req.flash('success', { msg: 'Ajax quantity has been updated.' });
      //res.redirect('/cart/' + existingCart.userID);
    });
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



