$(document).ready(function(){
  console.log("sdafsdf");
  $(".submit-found").click(function(e){

    $(".error").remove();
    console.log($("input[name='title']").val());

    if($("input[name='title']").val().length<3){
      e.preventDefault();
      $("input[name='title']").after("<p class='error'>Please enter a more descriptive title.</p>");
    }
    else if ($("input[name='pickupDetails']").val().length<7){
        e.preventDefault();
        $("input[name='pickupDetails']").after("<p class='error'>Please enter more descriptive pickup details.</p>");
      }
  });

});
