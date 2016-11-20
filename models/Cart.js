const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
	sessionID:      { type: String, default: '' },					
	items: 					[],																		// Array to hold items in cart: id, title, price, quantity
	shippingRate:		{ type: Number, default: 0  },
	shippingMethod:	{ type: String, default: '' },
	taxRate:				{ type: Number, default: 0.6 },					// Tax defaults to 6% for MD
	taxAmount:			{ type: Number, default: 0  },
	subTotal:				{ type: Number, default: 0  },
	total:					{ type: Number, default: 0  },
	createdOn:    	{ type: Date,   default: Date.now}
});

const cart = mongoose.model('cart', cartSchema);
module.exports = cart;