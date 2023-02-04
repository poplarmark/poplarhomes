window.addEventListener("load", function () {
  var child = document.getElementsByClassName("pac-container")[0];
  jQuery(child).detach().appendTo("#input_wrap-location");
});

window.addEventListener("load", function () {
  $(document).ready(function () {
    $("#onload-estimate-js").each(function () {
      $(this).insertAfter($(this).parent().find(".pac-container"));
    });
  });
});