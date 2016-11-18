const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
	sessionID:      { type: String, default: '' },
	userID:        	{ type: String, default: '' },
	numberOfItems:  { type: Number, default: 0  },
	items: 					[ { type: Number, type: Number } ],							// Array to hold items in cart
	shippingRate:		{ type: Number, default: 0  },
	shippingMethod:	{ type: String, default: '' },
	taxRate:				{ type: Number, default: 0.6 },
	taxAmount:			{ type: Number, default: 0  },
	subTotal:				{ type: Number, default: 0  },
	total:					{ type: Number, default: 0  },
	createdOn:    	{ type: Date,   default: Date.now}
});

const cart = mongoose.model('cart', cartSchema);
module.exports = cart;