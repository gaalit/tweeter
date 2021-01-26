$(document).ready(function() {

  $("#tweet-text").on('keyup', function(event) {
  const text = this.value.length;
  const limit = 140;
  const updatedCounter = limit - text;
  $(".counter").html(updatedCounter);

  if(updatedCounter < 0) {
   $(".counter").addClass("counter-red")
  } else {
    $(".counter").removeClass("counter-red")
  }
  });
});