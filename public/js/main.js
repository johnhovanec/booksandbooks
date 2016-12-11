$(document).ready(function() {

  // Place JavaScript code here...

	$(function(){
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
		 		$('h4').fadeOut(3000);
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



		 // // Paging of items on index page, Next button
		 // $('#nextBtn').on('click', function(event) {
			//  	//event.preventDefault();
			//  	$('.itemsTable').remove();  // remove existing records
			//  	console.log("nextBtn clicked");
			//  	var count = total;
			//  	console.log("Count = " + count);

			// 	// $.getJSON( "/pageNext/6", function( data ) {
			// 	//   //$( ".itemsTable" ).html( data );
			// 	//   	console.log( "Load was performed." );
			// 	// });

			// 	$.ajax({
	  //       url: '/pageNext',
	  //       data: { 'skip' : selectedId },
	  //       type: "post",
	  //       cache: false,
	  //       success: function (savingStatus) {
	  //           $("#hdnOrigComments").val($('#txtComments').val());
	  //           $('#lblCommentsNotification').text(savingStatus);
	  //       },
	  //       error: function (xhr, ajaxOptions, thrownError) {
	  //           $('#lblCommentsNotification').text("Error encountered while saving the comments.");
	  //       }
		 //    });
		 // });


		 // Paging of items on index page, Previous button
		 $('#prevBtn').on('click', function(event) {
		 		event.preventDefault();
		 		console.log("prevBtn clicked");
				// $.get(
			 //    "/ajaxPostRemove",
			 //    {
			 //    	//_csrf: $('input').eq(0).val(), 
				// 		userID: $('input').eq(1).val()			// Used to find user's cart
			 //    },	function(data) {
			 //    	//console.log(">>>>>> " + data);
			 //    }
			 //  );
		 });


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
