$(document).ready(function(){
  mapClicked = false;
  $("#map").click(function(){
    mapClicked = true;
  });
  $(".submit-found").click(function(e){

    $(".error").remove();
    if(!mapClicked){
      e.preventDefault();
      $('#map').before("<p class='error'>Please specify a location on the map!</p>")
    }
    else if($("input[name='title']").val().length<3){
      e.preventDefault();
      $("input[name='title']").after("<p class='error'>Please enter a more descriptive title.</p>");
    }
    else if ($("input[name='pickupDetails']").val().length<7){
        e.preventDefault();
        $("input[name='pickupDetails']").after("<p class='error'>Please enter more descriptive pickup details.</p>");
      }
  });

});
