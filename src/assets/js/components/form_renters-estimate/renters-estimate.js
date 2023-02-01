var options = {
  componentRestrictions: { country: "us" },
};
var gpaInput = document.getElementById("renters-estimate_input-location");
var autocomplete = new google.maps.places.Autocomplete(gpaInput, options);

function showRentals() {
  var geocoder = new google.maps.Geocoder();
  var address = gpaInput.value;
  var beds = document.getElementById("renters-estimate_input-bedroom").value;
  var baths = document.getElementById("renters-estimate_input-bathroom").value;
  var property_type = document.getElementById("property-type").value;
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();

      console.log(
        "latitude: ",
        latitude,
        "longitude: ",
        longitude,
        "beds: ",
        beds,
        "baths: ",
        baths,
        "property type: ",
        property_type
      );
      location.href = `https://www.poplarhomes.com/rental-properties-listing?beds=${beds}&lat=${latitude}&lng=${longitude}`;
    }
  });
}

window.addEventListener("load", function () {
  var child = document.getElementsByClassName("pac-container")[0];
  jQuery(child).detach().appendTo("#input_wrap-location");
});
