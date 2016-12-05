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

// To DO: Add function to calc subtotal, total, tax, etc each time checkout is called

	// Update item quantity in cart
	 $('.updateQuantity').on('click', function() {
	 		//alert("quantity updated!");
	 		$('.containerFlash').append('<h4>Quantity has been updated!</h4>')
	 		$('h4').fadeOut(2500);
			$.post(
		    "/ajaxPostQuantity",
		    {
		    	_csrf: $('input').eq(0).val(), 											
		    	quantity: $(this).parent().parent().find('input').eq(3).val(),  //closest('.quantity').attr('id'),
		    	index: $(this).parent().parent().find('input').eq(2).val(),			// Get the id value to use as the index to access the item being updated
					userID: $('input').eq(1).val()																	// Used to find user's cart
		    },	function(data) {
		    	//console.log(">>>>>> " + data);
		    }
		  );
	 })


	 // Delete an item from the cart
	 $('.deleteItem').on('click', function() {
	 		$('.containerFlash').append('<h4>Item has been removed from cart</h4>')
	 		$('h4').fadeOut(2500);
	 		$(this).parent().parent().parent().detach();  	// remove element but keep data for ajax call
			$.post(
		    "/ajaxPostRemove",
		    {
		    	_csrf: $('input').eq(0).val(), 
		    	index: $(this).parent().parent().parent().find('input').eq(2).val(),	// Get the id value to use as the index to access the item being updated
					userID: $('input').eq(1).val()		// Used to find user's cart
		    },	function(data) {
		    	//console.log(">>>>>> " + data);
		    	$(this).parent().parent().parent().remove();  // remove element and all bound data
		    	// alert("Item has been removed from cart.");
		    }
		  );
	 })

	 // Use to copy billing to shipping address on checkout
	 $('#sameAsBilling').change(function() {
     console.log("checkbox checked!");
     var checked = this.checked
     console.log("checked = " + checked);
     if (checked) {
        $('#ship_name').val($('#name').val());
        $('#ship_address').val($('#address').val());
        $('#ship_city').val($('#city').val());
        $('#ship_state').val($('#state').val());
        $('#ship_zip').val($('#zip').val() );
        $('#ship_email').val($('#email').val());
     } else {
        $('#ship_name').val('');
        $('#ship_address').val('');
        $('#ship_city').val('');
        $('#ship_state').val('');
        $('#ship_zip').val('');
        $('#ship_email').val('');
     }
   });


   

	});

});
