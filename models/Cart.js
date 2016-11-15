const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
	sessionID:      { type: String, default: '' },
	userID:        	{ type: String, default: '' },
	numberOfItems:  { type: Number, default: 0  },
	item:   				[
			{ book_id: String, 
				quantity: Number,
				quantity: 0,
			}
		],
	shippingRate:		{ type: Number, default: 0  },
	shippingMethod:	{ type: String, default: '' },
	taxRate:				{ type: Number, default: 0.6 },
	taxAmount:		{ type: Number, default: 0  },
	subTotal:		{ type: Number, default: 0  },
	Total:		{ type: Number, default: 0  },
	createdOn:    	{ type: Date,   default: Date.now}
});

const cart = mongoose.model('cart', cartSchema);
module.exports = cart;