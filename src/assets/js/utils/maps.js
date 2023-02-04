var map;
function initMap() {
  console.log("initMap call")
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.749933, lng: -73.98633 },
    zoom: 18
  });
  // Autocomplete restrictions
  var options = {
    componentRestrictions: { country: "us" },
  };
  var input = document.getElementById('pac_input');
  var autocomplete = new google.maps.places.Autocomplete(input, options);
  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo('bounds', map);

  //infowindow = new google.maps.InfoWindow();
  //infowindowContent = document.getElementById('infowindow-content');
  //infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
    //infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    var inputValue = place.formatted_address;
    console.log(inputValue);
    // Mirror autocomplete value to inputs with name=location
    $(document).ready(function () {
      $('input[name="location"]').val(inputValue);
    });
 
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(18);  // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    //infowindowContent.children['place-icon'].src = place.icon;
    //infowindowContent.children['place-name'].textContent = place.name;
    //infowindowContent.children['place-address'].textContent = address;
    //infowindow.open(map, marker);
  });
}

window.initMap = initMap;