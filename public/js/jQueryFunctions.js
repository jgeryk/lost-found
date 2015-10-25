$(document).ready(function(){
  $(".submit-found").click(function(){
    checkFoundForm();
  });
});

function checkFoundForm(){
  $(".error").remove();
  console.log($("input[name='title']").val());

  if($("input[name='title']").val().length<3){
    $("input[name='title']").after("<p class='error'>Please enter a more descriptive title.</p>");
  }
  else if{
    $("input[name='pickupDetails']").val().length<7){
      $("input[name='pickupDetails']").after("<p class='error'>Please enter more descriptive pickup details.</p>");
    }
  }


}
