$(document).ready(function() {

  // Place JavaScript code here...

$(function(){
	// Update item quantity in cart
 // $('.quantity').on('change', function(e){
	//  $.post(
	//     "/ajaxPostQuantity",
	//     {
	//     	_csrf: $('input').eq(0).val(), // $('meta[name="_csrf"]').attr('content'),
	//     	quantity: $(this).val(), 
	//     	index: $(this).attr('id'),				// Get the id value to use as the index to access the item being updated
	// 			userID: $('input').eq(1).val()
	//     },	function(data) {
	//     	console.log(">>>>>> " + data);
	//     }
	//   );
	// });

// To DO; Create route and controller for delete item. Implement delete item ajax call.

	// Update item quantity in cart
 $('.updateQuantity').on('click', function() {
 		//console.log("> index = " + $(this).parent().parent().find('input').eq(2).val() );
 		//console.log("> quantity = " + $(this).parent().parent().find('input').eq(3).val() );
		$.post(
	    "/ajaxPostQuantity",
	    {
	    	_csrf: $('input').eq(0).val(), 											// $('meta[name="_csrf"]').attr('content'),
	    	quantity: $(this).parent().parent().find('input').eq(3).val(),      //closest('.quantity').attr('id'),
	    	index: $(this).parent().parent().find('input').eq(2).val(),	// Get the id value to use as the index to access the item being updated
				userID: $('input').eq(1).val()
	    },	function(data) {
	    	console.log(">>>>>> " + data);
	    }
	  );
 })

 // Delete an item from the cart
 $('.deleteItem').on('click', function() {
 		console.log("deleteItem clicked");
		// $.post(
	 //    "/ajaxPost",
	 //    {
	 //    	_csrf: $('input').eq(0).val(), // $('meta[name="_csrf"]').attr('content'),
	 //    	quantity: $(this).val(), 
	 //    	index: $(this).attr('id'),				// Get the id value to use as the index to access the item being updated
		// 		userID: $('input').eq(1).val()
	 //    },	function(data) {
	 //    	console.log(">>>>>> " + data);
	 //    }
	 //  );
 })

	});

});
