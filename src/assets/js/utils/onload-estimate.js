window.addEventListener("load", function () {
  var child = document.getElementsByClassName("pac-container")[0];
  jQuery(child).detach().appendTo("#input_wrap-location");
});
