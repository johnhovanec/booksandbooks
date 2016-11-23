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

// /* GET cart by userID. */
//  exports.detail = (req, res) => {
//  Cart.find({ userID: "req.params.userID"}, (err, carts) => {
//     if (err) { return next(err); }
//     res.render('carts/', { carts: cart });
//     //res.send(book);
//     //res.json(book);
//   });
// };


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

  //console.log("In cart bookID = " + cart.items[0].ISBN + " userID = " + cart.userID);
  
  // Look for an exiting cart linked to the userID
  Cart.findOne({ userID: req.body.userID }, (err, existingCart) => {
    if (err) { return next(err); }

    if (existingCart) {
      req.flash('errors', { msg: 'Cart already exists!' });
      //return res.redirect('/cart');
      console.log("Found a cart for user");
      //res.render('cart/detail', { cart: cart });

      // Push new items into items []

    } else { 
        req.flash('success', { msg: 'New cart created!' });
        console.log("Creating new cart for user");                           // No existing cart found, create one
        const cart = new Cart({
          userID: req.body.userID,
          items: ({ 
                    //bookID: req.body.bookID, 
                    ISBN: req.body.ISBN,
                    title: req.body.title, 
                    price: req.body.price,
                    quantity: req.body.quantity
                  })
        });
    }
    cart.save((err) => {
      if (err) { return next(err); }
      // req.logIn(cart, (err) => {
      //   if (err) {
      //     return next(err);                  
      //   }
      //   res.redirect('/');
      // });
      res.redirect('/cart');
    });          

  });

  // });
};


// /**
//  * POST /signup
//  * Create a new local account.
//  */
// exports.postAddToCart = (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   console.log("In cart.js postAddToCart");

//   const errors = req.validationErrors();

//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('/books');
//   }

//   const cart = new Cart({
//     userID: req.body.userID,
//     items: ({ 
//               //bookID: req.body.bookID, 
//               ISBN: req.body.ISBN,
//               title: req.body.title, 
//               price: req.body.price,
//               quantity: req.body.quantity
//             })
//   });

//   //console.log("In cart bookID = " + cart.items[0].ISBN + " userID = " + cart.userID);
  
//   Cart.findOne({ userID: req.body.userID }, (err, existingCart) => {
//     if (err) { return next(err); }
//     if (existingCart) {
//       //req.flash('errors', { msg: 'Cart already exists!' });
//       //return res.redirect('/cart');
//       console.log("Found a cart for user");
//       //res.render('cart/detail', { cart: cart });
//   }
//     cart.save((err) => {
//       if (err) { return next(err); }
//       // req.logIn(cart, (err) => {
//       //   if (err) {
//       //     return next(err);                  
//       //   }
//       //   res.redirect('/');
//       // });
//       res.redirect('cart');
//     });          

//   });

//   // });
// };



/* GET Cart/Checkout page. */
 exports.getCheckout = (req, res) => {
  Cart.find((err, docs) => {
    res.render('cart/checkout', { 
      cart: docs,
      title: 'Checkout'
    });
  });
};

