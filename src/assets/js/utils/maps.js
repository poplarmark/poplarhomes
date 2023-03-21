var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
  });
  // Autocomplete restrictions
  var options = {
    componentRestrictions: { country: "us" },
  };
  console.log("map loaded");
  var input = document.getElementById("pac_input");
  var autocomplete = new google.maps.places.Autocomplete(input, options);
  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo("bounds", map);

  //infowindow = new google.maps.InfoWindow();
  //infowindowContent = document.getElementById('infowindow-content');
  //infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  autocomplete.addListener("place_changed", function () {
    // infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    console.log(place.address_components);
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert(
        "Can't find location: '" + place.name + "', in the autocomplete list"
      );
      return;
    }

    var inputValue = place.formatted_address;
    // Set input value of address field using Google API
    $(document).ready(function () {
      $('input[name="original_property_address"]').val(inputValue);
    });

    // parse address
    for (var i = 0; i < place.address_components.length; i++) {
      for (var j = 0; j < place.address_components[i].types.length; j++) {
        if (place.address_components[i].types[j] == "country") {
          console.log(place.address_components[i].long_name); // country
        }
        if (
          place.address_components[i].types[j] == "administrative_area_level_1"
        ) {
          console.log(place.address_components[i].short_name); // state
          var parsed_state = place.address_components[i].short_name;
          $(document).ready(function () {
            $('input[name="original_property_state"]').val(parsed_state);
          });
        }
        if (place.address_components[i].types[j] == "locality") {
          console.log(place.address_components[i].long_name); // city
          var parsed_city = place.address_components[i].long_name;
          $(document).ready(function () {
            $('input[name="original_property_city"]').val(parsed_city);
          });
        }
        if (place.address_components[i].types[j] == "route") {
          console.log(place.address_components[i].long_name); // street
          var parsed_street = place.address_components[i].long_name;
          $(document).ready(function () {
            $('input[name="original_property_street"]').val(parsed_street);
          });
        }
        if (place.address_components[i].types[j] == "postal_code") {
          console.log(place.address_components[i].long_name); // postal_code
          var parsed_zipcode = place.address_components[i].long_name;
          $(document).ready(function () {
            $('input[name="postal_code"]').val(parsed_zipcode);
            $('input[name="original_property_zip_code"]').val(parsed_zipcode);
          });
        }
      }
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.setCenter(place.geometry.location);
    } else {
      map.fitBounds(place.geometry.viewport);
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = "";
    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          "",
      ].join(" ");
    }

    //infowindowContent.children['place-icon'].src = place.icon;
    //infowindowContent.children['place-name'].textContent = place.name;
    //infowindowContent.children['place-address'].textContent = address;
    //infowindow.open(map, marker);
  });

  autocompleteBindLocation();
}

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

window.initMap = initMap;
