$(document).ready(function() {

  // Place JavaScript code here...

$(function(){
 // $('.quantity').on('change', function(e){
 //     var parameters = { 
	// 			quantity: $(this).val(),					// Get the new quantity
	// 			index: $(this).attr('id'),				// Get the id value to use as the index to access the item being updated
	// 			userID: $('input').eq(1).val()
	// 		};
 //       $.get('http://localhost:3000/ajax', parameters, function(data) {
 //       		$('#results').html(data);
 //     });
 //     // $.ajax('/ajax', {
 //     // 		method: "post",
 //     // 		success: function(data) {
 //     // 			$('#results').html(data);
 //     // 		},
 //     // 		error: function() {
 //     // 			$('#results').html("Error");
 //     // 		}
 //     // });
 // });

 
// var CSRF_HEADER = 'X-CSRF-Token';

// var setCSRFToken = function (securityToken) {
//   jQuery.ajaxPrefilter(function (options, _, xhr) {
//     if (!xhr.crossDomain) {
//       xhr.setRequestHeader(CSRF_HEADER, securityToken);
//     }
//   });
// };

// setCSRFToken($('meta[name="csrf-token"]').attr('content'));


	// Update item quantity in cart
 $('.quantity').on('change', function(e){
	 $.post(
	    "/ajaxPostQuantity",
	    {
	    	_csrf: $('input').eq(0).val(), // $('meta[name="_csrf"]').attr('content'),
	    	quantity: $(this).val(), 
	    	index: $(this).attr('id'),				// Get the id value to use as the index to access the item being updated
				userID: $('input').eq(1).val()
	    },	function(data) {
	    	console.log(">>>>>> " + data);
	    }
	  );
	});



 // $('.quantity').on('click', function() {
	// 	// var parameters = { 
	// 	// 	quantity: $(this).val(),					// Get the new quantity
	// 	// 	index: $(this).attr('id'),				// Get the id value to use as the index to access the item being updated
	// 	// 	userID: $('input').eq(1).val()
	// 	// };
	// 	$.post(
	//     "/ajaxPost",
	//     {
	//     	_csrf: $('input').eq(0).val(), // $('meta[name="_csrf"]').attr('content'),
	//     	quantity: $(this).val(), 
	//     	index: $(this).attr('id'),				// Get the id value to use as the index to access the item being updated
	// 			userID: $('input').eq(1).val()
	//     },	function(data) {
	//     	console.log(">>>>>> " + data);
	//     }
	//   );
 // })

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
