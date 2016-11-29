$(document).ready(function() {

  // Place JavaScript code here...

$(function(){
 $('.quantity').on('keyup', function(e){
   //if(e.keyCode === 13) {
     var parameters = { quantity: $(this).val() };
       $.get( '/ajax', parameters, function(data) {
       $('#results').html(data);
     });
    //};
 });
});

});