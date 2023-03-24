function autocompleteBindLocation() {
  // move .pac-container inside #input_wrap-location
  window.addEventListener("load", function () {
    var child = document.getElementsByClassName("pac-container")[0];
    jQuery(child).detach().appendTo("#input_wrap-location");
    console.log("pac_container loaded");
  });

  // for non-chrome based browswers, move loading of $this script at the end of .pac-container
  window.addEventListener("load", function () {
    $(document).ready(function () {
      $("#onload-estimate-js").each(function () {
        $(this).insertAfter($(this).parent().find(".pac-container"));
        console.log("pac_mover loader");
      });
    });
  });

  // prevent user from copy/pasting input values;
  // user must only select value from autocomplete
  const pasted_input = document.getElementById("pac_input");
  pasted_input.onpaste = (e) => e.preventDefault();
}
