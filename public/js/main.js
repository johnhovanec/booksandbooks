$(document).ready(function() {

  // Place JavaScript code here...

$(function(){
 $('.quantity').on('change', function(e){
     var parameters = { 
				quantity: $(this).val(),					// Get the new quantity
				index: $(this).attr('id')					// Get the id value to use as the index to access the item being updated
			};
       $.get('/ajax', parameters, function(data) {
       $('#results').html(data);
     });
 });
});

});
