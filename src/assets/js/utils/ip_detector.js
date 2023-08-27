function redirectToAccessDeniedPage() {
  let accessDeniedURL = "https://poplarhomes.com";
  window.location.href = accessDeniedURL;
}

function redirectToCareerPage(countryCode) {
  let careersURL = "https://poplarhomes.com/careers/";
  if (countryCode === "PH") {
    careersURL += "ph";
  } else {
    careersURL += "us";
  }
  window.location.href = careersURL;
}

function handleGeolocationError(error) {
  if (error.code === error.PERMISSION_DENIED) {
    redirectToAccessDeniedPage(); // Redirect to the access denied page if geolocation permission is denied
  }
}

function checkIPLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng(latitude, longitude);

      geocoder.geocode({ latLng: latlng }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          let country = "";
          for (let i = 0; i < results[0].address_components.length; i++) {
            let component = results[0].address_components[i];
            if (component.types.includes("country")) {
              country = component.short_name;
              break;
            }
          }

          redirectToCareerPage(country);
        }
      });
    }, handleGeolocationError);
  } else {
    redirectToAccessDeniedPage(); // Redirect to the access denied page if geolocation is not supported
  }
}

// Load the Google Maps Geocoder library
function loadGoogleMaps() {
  const script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyCBFtGp6YxnEqcABn4HciClPotDeresTzE&libraries=places&callback=checkIPLocation";
  document.body.appendChild(script);
}

// Load the Google Maps API
window.onload = function () {
  loadGoogleMaps();
};
