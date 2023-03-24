function initMap() {
    // Modals
    const wf_form_main = document.getElementById("serviced-block_trigger-layer");
    const wf_form_unserviced = document.getElementById("unserviced-block_trigger-layer");
    const wf_form_empty = document.getElementById("emptyfield-block_trigger-layer");
    // Forms
    const form_rent_estimate = document.getElementById("form_rentestimate");
    const form_serviced = document.getElementById("form_serviced");
    const form_unserviced = document.getElementById("form_unserviced");
    // Rent estimate form fields
    const autocomplete_input = document.getElementById("pac_input");
    const property_type = document.getElementById("property-type");
    const bedroom_count = document.getElementById("rent-estimate_input-bedroom");
    const bathroom_count = document.getElementById("rent-estimate_input-bathroom");
    // Form serviced form fields
    const serviced_input_firstname = document.getElementById("serviced_input-firstname");
    const serviced_input_lastname = document.getElementById("serviced_input-lastname");
    const serviced_input_email = document.getElementById("serviced_input-email");
    const serviced_input_phone = document.getElementById("serviced_input-phone");
    // Form unserviced form fields
    const unserviced_input_fullname = document.getElementById("unserviced_input-fullname");
    const unserviced_input_email = document.getElementById("unserviced_input-email");
    const unserviced_map = document.getElementById("unserviced_map");
    // Google API autocomplete restriction options
    const autocomplete_options = {
        componentRestrictions: { country: "us" },
    };
    // Google sheet post
    const pipeToGoogleSheet = function (sheetURL, formData) {
      $.ajax({
        url: sheetURL,
        method: "GET",
        dataType: "json",
        data: formData,
        success: function (data) {
          console.log("Google Sheet -->", data);
        },
      });
    };

    function getGoogleAddressComponent(
      components,
      desiredComponent,
      desiredLength
    ) {
      console.log(hasOwnProperty);
      if (!components.length) return;
      for (var i = 0; i < components.length; i++) {
        if (components[i].hasOwnProperty("types")) {
          for (var j = 0; j < components[i].types.length; j++) {
            if (components[i].types[j] === desiredComponent) {
              return components[i][desiredLength];
            }
          }
        }
      }
    }
    
    if (autocomplete_input) {
        var autocomplete_component;
        var autocomplete = new google.maps.places.Autocomplete(autocomplete_input, autocomplete_options);
        google.maps.event.addListener(autocomplete, "place_changed", function () {
        let place = autocomplete.getPlace().address_components;
        let zipcode = document.getElementById("rent-estimate_input-postal-code");
        const zipcode_initial_value = getGoogleAddressComponent(place, "postal_code", "short_name");
        zipcode.value = zipcode_initial_value;
        if(zipcode.value == 'undefined') {
            zipcode.value = '';
        }
        autocomplete_component = {
            city: getGoogleAddressComponent(place, "locality", "long_name"),
            route: getGoogleAddressComponent(place, "route", "short_name"),
            state: getGoogleAddressComponent(place,"administrative_area_level_1","short_name"),
            street_no: getGoogleAddressComponent(place,"street_number","long_name"),
            zip: zipcode.value,
        };
    
        zipcode.addEventListener('change', function() {
            autocomplete_component.zip = this.value;
            console.log("Updated zip_value:", this.value)
        });
        console.log("ADDRESS:", autocomplete_component);
        });
    }
    rentEstimate();
    mapLocation();
}

window.initMap = initMap;