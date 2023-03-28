const form_renters_estimate = document.getElementById("form_renters-estimate");
const renters_estimate_button = document.getElementById("renters-estimate_button");
const renters_dropdown = document.getElementById("renters_dropdown");
const beds = document.getElementById("renters-estimate_input-bedroom");
const baths = document.getElementById("renters-estimate_input-bathroom");
const property_type = document.getElementById("property-type");
// default properties for submit button
renters_estimate_button.disabled = true;
renters_estimate_button.style.opacity = "0.5";
// identify an element to observe
selection_location_value = window.document.getElementsByClassName('select-selected')[0];
// create a new instance of 'MutationObserver' named 'observer', 
// passing it a callback function
observer = new MutationObserver(function(mutationsList, observer) {
  console.log(mutationsList);
  renters_estimate_button.disabled = false;
  renters_estimate_button.style.opacity = "1"; 
});
// call 'observe' on that MutationObserver instance, 
// passing it the element to observe, and the options object
observer.observe(selection_location_value, {characterData: false, childList: true, attributes: false});
// Renters estimate form event handler
form_renters_estimate.addEventListener('submit', (event) => {
  event.preventDefault();
  showRentals();
  observer.disconnect(); // disconnect `observer`
})

function showRentals() {
  let geocoder = new google.maps.Geocoder();
  let address = renters_dropdown.value;
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();

      console.log("latitude: ",latitude,"longitude: ",longitude,"beds: ",beds.value,"baths: ",baths.value,"property type: ",property_type.value);
      location.href = `https://www.poplarhomes.com/rental-properties-listing?beds=${beds.value}&lat=${latitude}&lng=${longitude}&page=1&priceMin=785&propertyType=${property_type.value}&wfhReady=false`;
    }
  });
}