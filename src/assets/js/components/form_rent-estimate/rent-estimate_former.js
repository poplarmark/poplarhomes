function getGoogleAddressComponent(components, desiredComponent, desiredLength) {
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

  let wf_location = document.getElementById("pac_input");
  let autocomplete_options = {
    componentRestrictions: { country: "us" },
  };
  
  if (wf_location) {
    var autocomplete_component;
    var autocomplete = new google.maps.places.Autocomplete(wf_location, autocomplete_options);
    google.maps.event.addListener(autocomplete, "place_changed", function () {
      let place = autocomplete.getPlace().address_components;
      let zipcode = document.getElementById("zipcode");
      const zipcode_initial_value = getGoogleAddressComponent(place, "postal_code", "short_name");
      zipcode.value = zipcode_initial_value;
  
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
  
  $(document).ready(function () {
    const pipeToGoogleSheet = function (sheetURL, formData) {
      $.ajax({
        url: sheetURL,
        method: "GET",
        dataType: "json",
        data: formData,
        success: function (data) {
          console.log('Google Sheet -->', data);
        },
      });
    };

    // Format phone number to 10-digit US
    $("input[name=phone]").keyup(function (e) {
      var phone_input = this.value.replace(/\D/g, "").substring(0, 10);
      // Backspace and Delete keys
      var deleteKey = e.keyCode == 8 || e.keyCode == 46;
      var len = phone_input.length;
      if (len == 0) {
        phone_input = phone_input;
      } else if (len < 3) {
        phone_input = "(" + phone_input;
      } else if (len == 3) {
        phone_input = "(" + phone_input + (deleteKey ? "" : ") ");
      } else if (len < 6) {
        phone_input = "(" + phone_input.substring(0, 3) + ") " + phone_input.substring(3, 6);
      } else if (len == 6) {
        phone_input = "(" + phone_input.substring(0, 3) + ") " + phone_input.substring(3, 6) + (deleteKey ? "" : "-");
      } else {
        phone_input = "(" + phone_input.substring(0, 3) + ") " + phone_input.substring(3, 6) + "-" + phone_input.substring(6, 10);
      }
      this.value = phone_input;
    });
  
    let $rentEstimateForm = $("#form_rentestimate");
    let rentEstimateFormValidator;
    $rentEstimateForm.find("input[type=text], input[type=number], input[type=email], select").attr("required", "required");
    if ($rentEstimateForm.length) {
      rentEstimateFormValidator = $rentEstimateForm.validate({
        rules: {
          address: {
            required: true,
          },
          zipcode: {
            required: true,
          },
          bedrooms: {
            required: true,
            number: true,
            min: 1,
          },
          bathrooms: {
            required: true,
            number: true,
            min: 1,
          },
          "property-type": {
            required: true,
          },
        },
        messages: {
          address: {
            required: "Select a city or enter address.",
          },
          zipcode: {
            required: "Enter zipcode",
          },
          bedrooms: {
            required: "Required",
            number: "Must be a number",
            min: "Must be greater than 1",
          },
          bathrooms: {
            required: "Required",
            number: "Must be a number",
            min: "Must be greater than 1",
          },
          "property-type": {
            required: "Property Type is required",
          },
        },
      });
  
      $rentEstimateForm.submit(function (event) {
        const cities = [
        "Accokeek",
        "Alameda",
        "Alamo",
        "Albany",
        "Alhambra",
        "Alief",
        "Aliso Viejo",
        "Altadena",
        "Alvin",
        "Alviso",
        "Andrews Air Force Base",
        "Angleton",
        "Annada",
        "Annapolis Junction",
        "Annapolis",
        "Antelope",
        "Antioch",
        "Apex",
        "Aquasco",
        "Arcadia",
        "Arnold",
        "Arvada",
        "Ashton",
        "Atherton",
        "Augusta",
        "Aurora",
        "Austin",
        "Bacliff",
        "Ballwin",
        "Baltimore",
        "Barker",
        "Barnesville",
        "Barnhart",
        "Bastrop",
        "Baytown",
        "Beallsville",
        "Beaufort",
        "Bell Gardens",
        "Bell",
        "Bellaire",
        "Bellevue",
        "Bellflower",
        "Belmont",
        "Beltsville",
        "Belvedere Tiburon",
        "Berkeley",
        "Bethesda",
        "Beverly Hills",
        "Bladensburg",
        "Bloomington",
        "Blue Diamond",
        "Bonita",
        "Bonsall",
        "Bothell",
        "Boulder City",
        "Boulder",
        "Bowie",
        "Boyds",
        "Brandywine",
        "Brentwood",
        "Bridgeton",
        "Brighton",
        "Brinklow",
        "Brisbane",
        "Brookeville",
        "Broomfield",
        "Bryn Mawr",
        "Buda",
        "Buena Park",
        "Bunkerville",
        "Burbank",
        "Burlingame",
        "Burtonsville",
        "Byron",
        "Cabin John",
        "Cal Nev Ari",
        "Campbell",
        "Canoga Park",
        "Canyon",
        "Capistrano Beach",
        "Capitol Heights",
        "Capitola",
        "Cardiff By The Sea",
        "Carlsbad",
        "Carmichael",
        "Carson",
        "Cary",
        "Castro Valley",
        "Catawissa",
        "Cedar Creek",
        "Cedar Hill",
        "Cedar Park",
        "Channelview",
        "Chapel Hill",
        "Charleston",
        "Chatsworth",
        "Cheltenham",
        "Chesterfield",
        "Chevy Chase",
        "Chino",
        "Chula Vista",
        "Churchton",
        "Citrus Heights",
        "City Of Industry",
        "Claremont",
        "Clarksburg",
        "Clarksville",
        "Clayton",
        "Clinton",
        "College Park",
        "Colton",
        "Columbia",
        "Commerce City",
        "Compton",
        "Concord",
        "Conroe",
        "Cooksville",
        "Corona",
        "Coronado",
        "Corpus Christi",
        "Corte Madera",
        "Coupland",
        "Coyote Springs",
        "Coyote",
        "Crockett",
        "Crofton",
        "Crosby",
        "Crownsville",
        "Crystal City",
        "Culver City",
        "Cupertino",
        "Curtis Bay",
        "Cypress",
        "Daly City",
        "Damascus",
        "Dana Point",
        "Danville",
        "Davidsonville",
        "Davis",
        "Dayton",
        "De Soto",
        "Deale",
        "Deer Park",
        "Defiance",
        "Del Mar",
        "Del Valle",
        "Denver",
        "Derwood",
        "Diablo",
        "Dickerson",
        "Dickinson",
        "District Heights",
        "Dittmer",
        "Dodgertown",
        "Downey",
        "Dripping Springs",
        "Duarte",
        "Dublin",
        "Dupont",
        "Durham",
        "Dutzow",
        "Earth City",
        "Eastlake",
        "Edgewater",
        "Edmonds",
        "El Cajon",
        "El Cerrito",
        "El Dorado Hills",
        "El Granada",
        "El Monte",
        "El Segundo",
        "El Sobrante",
        "El Toro",
        "Elgin",
        "Elk Grove",
        "Elkridge",
        "Ellicott City",
        "Elsberry",
        "Elverta",
        "Emeryville",
        "Encinitas",
        "Englewood",
        "Eolia",
        "Escondido",
        "Eugene",
        "Eureka",
        "Everett",
        "Fair Oaks",
        "Fallbrook",
        "Fenton",
        "Festus",
        "Fletcher",
        "Flinthill",
        "Florence",
        "Florissant",
        "Foley",
        "Folly Beach",
        "Folsom",
        "Fontana",
        "Foristell",
        "Fort George G Meade",
        "Fort Washington",
        "Freeport",
        "Fremont",
        "French Village",
        "Fresno",
        "Friendship",
        "Friendswood",
        "Fulton",
        "Fuquay Varina",
        "Gaithersburg",
        "Galena Park",
        "Galesville",
        "Gambrills",
        "Gardena",
        "Garner",
        "Garrett Park",
        "Georgetown",
        "Gerald",
        "Germantown",
        "Gibson Island",
        "Gilroy",
        "Glen Burnie",
        "Glen Echo",
        "Glencoe",
        "Glendale",
        "Glenelg",
        "Glenn Dale",
        "Glenwood",
        "Goose Creek",
        "Granada Hills",
        "Grand Terrace",
        "Granite Bay",
        "Gray Summit",
        "Greenbelt",
        "Greenbrae",
        "Grover",
        "Grubville",
        "Guasti",
        "Half Moon Bay",
        "Hanahan",
        "Hanover",
        "Harbor City",
        "Harker Heights",
        "Harmans",
        "Harwood",
        "Hawk Point",
        "Hawthorne",
        "Hayward",
        "Hazelwood",
        "Hempstead",
        "Henderson",
        "Herculaneum",
        "Hercules",
        "Hermosa Beach",
        "High Hill",
        "High Ridge",
        "Highland",
        "Highlands",
        "Hillsboro",
        "Hitchcock",
        "Holly Springs",
        "Hood",
        "House Springs",
        "Houston",
        "Huffman",
        "Humble",
        "Huntington Park",
        "Hutto",
        "Hyattsville",
        "Imperial Beach",
        "Imperial",
        "Indian Springs",
        "Inglewood",
        "Irvine",
        "Isle Of Palms",
        "Issaquah",
        "Jarrell",
        "Jean",
        "Jessup",
        "Johns Island",
        "Jonesburg",
        "Katy",
        "Kemah",
        "Kenmore",
        "Kensington",
        "Kent",
        "Kentfield",
        "Killeen",
        "Kimmswick",
        "Kingwood",
        "Kirkland",
        "Knightdale",
        "Kyle",
        "La Canada Flintridge",
        "La Crescenta",
        "La Jolla",
        "La Marque",
        "La Mesa",
        "La Porte",
        "Labadie",
        "Ladera Ranch",
        "Ladson",
        "Lafayette",
        "Laguna Beach",
        "Laguna Hills",
        "Laguna Niguel",
        "Laguna Woods",
        "Lake Forest",
        "Lake Saint Louis",
        "Lakewood",
        "Lanham",
        "Larkspur",
        "Las Vegas",
        "Laughlin",
        "Laurel",
        "Lawndale",
        "League City",
        "Leander",
        "Lemon Grove",
        "Leslie",
        "Liberty Hill",
        "Liguori",
        "Linthicum Heights",
        "Lisbon",
        "Littleton",
        "Livermore",
        "Liverpool",
        "Logandale",
        "Loma Linda",
        "Lomita",
        "Lonedell",
        "Long Beach",
        "Los Altos",
        "Los Angeles",
        "Los Gatos",
        "Luebbering",
        "Lynnwood",
        "Lynwood",
        "Manchaca",
        "Manhattan Beach",
        "Manor",
        "Manvel",
        "Mapaville",
        "March Air Reserve Base",
        "Marina Del Rey",
        "Marthasville",
        "Martinez",
        "Maryland Heights",
        "Mather",
        "Mayo",
        "Maywood",
        "Mcclellan",
        "Medina",
        "Menlo Park",
        "Mercer Island",
        "Mesquite",
        "Mill Creek",
        "Mill Valley",
        "Millbrae",
        "Millersville",
        "Milpitas",
        "Mira Loma",
        "Mission Hills",
        "Mission Viejo",
        "Missouri City",
        "Moapa",
        "Moncks Corner",
        "Moncure",
        "Monrovia",
        "Montara",
        "Montclair",
        "Montebello",
        "Monterey Park",
        "Montgomery City",
        "Montgomery Village",
        "Montrose",
        "Moraga",
        "Moreno Valley",
        "Morgan Hill",
        "Morrisville",
        "Moscow Mills",
        "Moss Beach",
        "Mount Pleasant",
        "Mount Rainier",
        "Mountain View",
        "Mountlake Terrace",
        "Mukilteo",
        "Nashville",
        "National City",
        "Nellis Afb",
        "New Florence",
        "New Haven",
        "New Hill",
        "New Melle",
        "Newark",
        "Norco",
        "North Charleston",
        "North Highlands",
        "North Hills",
        "North Hollywood",
        "North Houston",
        "North Las Vegas",
        "Northridge",
        "O'Fallon",
        "Oakland",
        "Oceanside",
        "Odenton",
        "Old Monroe",
        "Olney",
        "Ontario",
        "Orangevale",
        "Orinda",
        "Overton",
        "Oxon Hill",
        "Pacific",
        "Pacifica",
        "Pacoima",
        "Palo Alto",
        "Palos Verdes Peninsula",
        "Panorama City",
        "Paramount",
        "Pasadena",
        "Patton",
        "Pearland",
        "Perris",
        "Pevely",
        "Pflugerville",
        "Pico Rivera",
        "Piedmont",
        "Pinole",
        "Pittsburg",
        "Playa Del Rey",
        "Pleasant Hill",
        "Pleasanton",
        "Pomona",
        "Poolesville",
        "Port Costa",
        "Portage Des Sioux",
        "Porter Ranch",
        "Porter",
        "Portland",
        "Potomac",
        "Poway",
        "Raleigh",
        "Rancho Cordova",
        "Rancho Cucamonga",
        "Rancho Palos Verdes",
        "Rancho Santa Fe",
        "Rancho Santa Margarita",
        "Redlands",
        "Redmond",
        "Redondo Beach",
        "Redwood City",
        "Renton",
        "Represa",
        "Rescue",
        "Reseda",
        "Rialto",
        "Richmond",
        "Richwoods",
        "Rio Linda",
        "Riva",
        "Riverdale",
        "Riverside",
        "Robertsville",
        "Rocklin",
        "Rockville",
        "Rodeo",
        "Rolesville",
        "Rosemead",
        "Rosenberg",
        "Roseville",
        "Rosharon",
        "Ross",
        "Round Rock",
        "Sacramento",
        "Saint Albans",
        "Saint Ann",
        "Saint Charles",
        "Saint Clair",
        "Saint Louis",
        "Saint Peters",
        "Salado",
        "Sammamish",
        "San Anselmo",
        "San Bernardino",
        "San Bruno",
        "San Carlos",
        "San Clemente",
        "San Diego",
        "San Dimas",
        "San Fernando",
        "San Francisco",
        "San Gabriel",
        "San Jose",
        "San Juan Capistrano",
        "San Leandro",
        "San Lorenzo",
        "San Luis Rey",
        "San Marcos",
        "San Marino",
        "San Martin",
        "San Mateo",
        "San Pablo",
        "San Pedro",
        "San Quentin",
        "San Rafael",
        "San Ramon",
        "San Ysidro",
        "Sandy Spring",
        "Santa Clara",
        "Santa Cruz",
        "Santa Fe",
        "Santa Monica",
        "Santee",
        "Saratoga",
        "Sausalito",
        "Savage",
        "Scotts Valley",
        "Seabrook",
        "Seahurst",
        "Searchlight",
        "Seattle",
        "Severn",
        "Severna Park",
        "Shady Side",
        "Sierra Madre",
        "Signal Hill",
        "Silex",
        "Silver Spring",
        "Simpsonville",
        "Sloan",
        "Solana Beach",
        "South El Monte",
        "South Gate",
        "South Houston",
        "South Pasadena",
        "South San Francisco",
        "Spencerville",
        "Spring Valley",
        "Spring",
        "Stafford",
        "Stanford",
        "Stanton",
        "Studio City",
        "Sugar Land",
        "Suitland",
        "Sullivan",
        "Sullivans Island",
        "Summerville",
        "Sun Valley",
        "Sunnyvale",
        "Sunol",
        "Sylmar",
        "Takoma Park",
        "Tarzana",
        "Taylor",
        "Temple City",
        "Temple Hills",
        "Temple",
        "Texas City",
        "The Lakes",
        "Thompsons",
        "Toluca Lake",
        "Tomball",
        "Torrance",
        "Tracy",
        "Tracys Landing",
        "Troy",
        "Truxton",
        "Tujunga",
        "Union City",
        "Union",
        "Universal City",
        "Upland",
        "Upper Marlboro",
        "Valencia",
        "Vallejo",
        "Valles Mines",
        "Valley Park",
        "Valley Village",
        "Van Nuys",
        "Venice",
        "Verdugo City",
        "Villa Ridge",
        "Vista",
        "Wake Forest",
        "Waller",
        "Walnut Creek",
        "Warrenton",
        "Washington Grove",
        "Washington",
        "Webster",
        "Wendell",
        "Wentzville",
        "West Alton",
        "West Columbia",
        "West Friendship",
        "West Hills",
        "West Hollywood",
        "West River",
        "West Sacramento",
        "Westminster",
        "Whiteside",
        "Willow Spring",
        "Wilmington",
        "Winfield",
        "Winnetka",
        "Woodbine",
        "Woodland Hills",
        "Woodland",
        "Woodstock",
        "Wright City",
        "Yolo",
        "Zebulon",
        ];
        //Check if a value exists in the cities array
        const isLocalPartner = cities.find((city) => city === autocomplete_component.city);
  
        event.preventDefault();
        if ($rentEstimateForm.valid()) {
          // Update content to Local Partners if under this city
          if (autocomplete_component?.state &&
             (autocomplete_component.state === "TX" ||
              autocomplete_component.state === "SC" ||
              autocomplete_component.state === "MO" ||
              autocomplete_component.state === "NC" ||
              autocomplete_component.state === "OH") &&
              autocomplete_component?.city && isLocalPartner) {
                // Open subsidiary modal
                const wf_form_subsidiary = document.getElementById("subsidiary-block_trigger-layer");
                wf_form_subsidiary.style.display = "block";
              }
          if ((autocomplete_component?.state &&
              (autocomplete_component.state === "OR" ||
               autocomplete_component.state === "TN" ||
               autocomplete_component.state === "CA" ||
               autocomplete_component.state === "WA" ||
               autocomplete_component.state === "CO" ||
               autocomplete_component.state === "NV" ||
               autocomplete_component.state === "MD")) ||
              (autocomplete_component?.city &&
              (autocomplete_component.city === "Las Vegas" || isLocalPartner))) {
                // Open main modal
                const wf_form_main = document.getElementById("serviced-block_trigger-layer");
                wf_form_main.style.display = "block";
              }
          let propertyAddress = $("input#pac_input").val();
          console.log(propertyAddress);
          $(".address-map").attr("src","https://www.google.com/maps?q=" + propertyAddress + "&output=embed");
          // Open unserviced modal
          const wf_form_unserviced = document.getElementById("unserviced-block_trigger-layer");
          wf_form_unserviced.style.display = "block";
          return false;
        }
        rentEstimateFormValidator.showErrors();
        return false;
      });
    }
  
    let $wf_wrapper = $(".w-form");
    let $wf_wrapper_form = $(".w-form form");
    let lyopValidator;
  
    function reset_wf_form() {
      setTimeout(function () {
        $wf_wrapper_form.find("input:not('submit')").val("");
        $wf_wrapper_form.find(".rent-estimate-details-submit").val("Sent");
        $("form#rent-estimate_button").find("input, select").val("");
  
        setTimeout(function () {
          $rentEstimateForm.trigger("reset");
          // $wf_wrapper.find(".lyop-form-details").hide();
          $wf_wrapper.find(".lyop-form-success").show();
          $wf_wrapper_form.find(".rent-estimate-details-submit").val("Send me my report");
        }, 500);
      }, 2000);
  
      setTimeout(function () {
        $wf_wrapper.find(".lyop-form-details").hide();
        $wf_wrapper.find(".lyop-form-success").show();
        $(".popup-success").hide();
      }, 3000);
    }
  
    // $wf_wrapper.find(".lyop-form-success a.close-success").click(function () {
    //   $.magnificPopup.close();
    // });
  
    function addProperty(property, utm, token) {
      fetch("https://www.poplarhomes.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          query: `mutation {
                      addProperty(input: {
                          property: {
                              type: ${property.type},
                              propertyCategory: ${property.propertyCategory},
                              numBeds: ${property.numBeds},
                              numBaths: ${property.numBaths},
                              street: "${property.street}",
                              city: "${property.city}",
                              state: "${property.state}",
                              zipCode: "${property.zipCode}",
                              country: "USA"
                          },
                          UTMCampaign: "${utm.UTMCampaign}",
                          UTMContent: "${utm.UTMContent}",
                          UTMMedium: "${utm.UTMMedium}",
                          UTMSource: "${utm.UTMSource}",
                          UTMTerm: "${utm.UTMTerm}",
                      }) {
                          property {
                              propertyID
                              unitNumber
                              name
                              numBaths
                              numBeds
                              status
                              type
                              communityFeatures
                              interiorFeatures
                              exteriorFeatures
                              appliances
                              isFurnished
                              petPolicy
                              petInformation
                              climateControls
                              washerDryerType
                              additionalRooms
                              desiredLeaseRange
                              storageType
                              storageFee
                              parkingTypes
                              renterResponsibleUtilities
                              ownerResponsibleUtilities
                              latitude
                              longitude
                              totalArea
                              street
                              city
                              state
                              country
                              county
                              zipCode
                          }
                      }
                  }`,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          reset_wf_form();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    function registerOwner(user, property, utm) {
      fetch("https://www.poplarhomes.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `mutation {
                      registerOwner(input: {
                          user: {
                              firstName: "${user.firstName}",
                              lastName: "${user.lastName}",
                              email: "${user.email}",
                              phone: "${user.phone}",
                              UTMCampaign: "${utm.UTMCampaign}",
                              UTMContent: "${utm.UTMContent}",
                              UTMMedium: "${utm.UTMMedium}",
                              UTMSource: "${utm.UTMSource}",
                              UTMTerm: "${utm.UTMTerm}",
                              leadSource: ONERENT_WEBSITE_GET_RENT_ESTIMATE_LANDING_PAGE
                          }
                      }) {
                      token
                      }
                  }`,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.errors) {
            let today = new Date(),
              date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
              time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
              dateTime = date + " " + time;
 
            let googleSheetData = {
              Timestamp: dateTime,
              Name: `${user.firstName} ${user.lastName}`,
              Email: `${user.email}`,
              phone: `${user.phone}`,
              Location: $("#pac_input").val(),
              "Submission Error": "true",
              utm_source: `WEB-${utm.UTMSource}`,
              utm_campaign: `${utm.UTMCampaign}`,
              utm_medium: `${utm.UTMMedium}`,
              utm_content: `${utm.UTMContent}`,
            };
  
            pipeToGoogleSheet("https://script.google.com/macros/s/AKfycbwdTw0XzSPs4Y1Fou6jdLToblFjZneJZGRd2EEowbOMpTgX5te8/exec", googleSheetData);
            reset_wf_form();
            return false;
          }
          let token = res.data.registerOwner.token;
          addProperty(property, utm, token);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    $wf_wrapper_form.find("input[type=text], input[type=tel], input[type=email], select").attr("required", "required");
    if ($wf_wrapper_form.length) {
      lyopValidator = $wf_wrapper_form.validate({
        rules: {
          email: {
            required: true,
            email: true,
          },
          fname: {
            required: true,
          },
          lname: {
            required: true,
          },
          phone: {
            required: true,
          },
        },
        messages: {
          email: {
            required: "Email is required",
            email: "This is not a valid email address",
          },
          fname: {
            required: "First name is required",
          },
          lname: {
            required: "Last name is required",
          },
          phone: {
            required: "Phone number is required",
          },
        },
      });
    }
  
    $wf_wrapper_form.find(".rent-estimate-details-submit").click(function (event) {
      event.preventDefault();
      if ($wf_wrapper_form.valid()) {
        let property = {
          type: $("#property-type").val(),
          propertyCategory: $("#property-type option:selected").attr("category_value"),
          numBeds: $("#rent-estimate_input-bedroom").val(),
          numBaths: $("#rent-estimate_input-bathroom").val(),
          street: autocomplete_component ? autocomplete_component.street_no + " " + autocomplete_component.route : $("#pac_input").val(),
          city: autocomplete_component && autocomplete_component.city ? autocomplete_component.city: "",
          state: autocomplete_component ? autocomplete_component.state : "",
          zipCode: autocomplete_component ? autocomplete_component.zip : "",
        };
  
        let user = {
          firstName: $wf_wrapper_form.find("#serviced_input-firstname").val(),
          lastName: $wf_wrapper_form.find("#serviced_input-lastname").val(),
          email: $wf_wrapper_form.find("#serviced_input-email").val(),
          phone: $wf_wrapper_form.find("#serviced_input-phone").val(),
        };
        let utm = {
          UTMCampaign: sessionStorage.getItem("utm_campaign")
            ? sessionStorage.getItem("utm_campaign")
            : "",
          UTMContent: sessionStorage.getItem("utm_content")
            ? sessionStorage.getItem("utm_content")
            : document.referrer,
          UTMMedium: sessionStorage.getItem("utm_medium")
            ? sessionStorage.getItem("utm_medium")
            : "rent-estimate-popup",
          UTMSource: sessionStorage.getItem("utm_source")
            ? sessionStorage.getItem("utm_source")
            : "organic",
          UTMTerm: sessionStorage.getItem("utm_term")
            ? sessionStorage.getItem("utm_term")
            : "",
        };
  
        console.log(utm);
  
        registerOwner(user, property, utm);
        return false;
      }
      lyopValidator.showErrors();
      return false;
    });
  
    $("#form_unserviced")
      .find("input[type=text], input[type=tel], input[type=email], select")
      .attr("required", "required");
    let form_unserviced = $("#form_unserviced");
    let form_unserviced_validator;
    if (form_unserviced.length) {
      form_unserviced_validator = form_unserviced.validate({
        rules: {
          "full_name": {
            required: true,
          },
          email: {
            required: true,
            email: true,
          },
        },
        messages: {
          "full_name": {
            required: "Full name is required",
          },
          email: {
            required: "Email is required",
            email: "This is not a valid email address",
          },
        },
      });
    }
  
    let submitted = 0;
    form_unserviced.find("#submit-rent-estimate-notify").click(function (event) {
      event.preventDefault();
      if (form_unserviced.valid()) {
        if (submitted > 0) {
          $(".w-form-done").show() // Show success
        } else {
          const fullName = $('input[name="full_name"]').val(),
            email = $('input[name="email"]').val(),
            propertyAddress = $("#pac_input").val(),
            propertyType = $("#property-type").val(),
            bedrooms = $("#rent-estimate_input-bedroom").val(),
            bathrooms = $("#rent-estimate_input-bathroom").val(),
            utmSource = "WEB-organic",
            utmMedium = "rent estimate outbound form",
            utmCampaign = "",
            utmContent = "",
            today = new Date(),
            date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
            time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
            dateTime = date + " " + time;
  
          const googleSheetData = {
            Timestamp: dateTime,
            utm_source: utmSource,
            utm_campaign: utmCampaign,
            utm_medium: utmMedium,
            utm_content: utmContent,
            "Full Name": fullName,
            Email: email,
            "Property Address": propertyAddress,
            "Property Type": propertyType,
            Bedrooms: bedrooms,
            Bathrooms: bathrooms,
          };
          pipeToGoogleSheet("https://script.google.com/macros/s/AKfycbwZSqwAs6FBluPYSz1kTQwVRFCA4KDXV85rvFUcIVplO97w_Mq6ZW2D2cm3afKpnnvG/exec", googleSheetData);
          submitted++;
          $(".form-success").append("<p>Awesome! You are just added to our wait list. We will update you as soon as we expand to your area.</p>");
          // setTimeout(function () {
          //   submitted = 0;
          //   $(".lyop-form").trigger("reset");
          //   $(".form-success p").remove();
          //   $.magnificPopup.close();
          // }, 5000);
          $(this).submit();
        }
      } else {
        validator.showErrors();
      }
    });
   
    $(".default-dropdown ul li").click(function () {
      let selectedDefault = $(this).text();
      $("#pac_input").val(selectedDefault);
      $(".default-dropdown").hide();
    });
  
    $("#pac_input").click(function () {
      let address = $(this);
      if (!address.val()) {
        $("#pac_input-error").css("display", "none");
        $(".default-dropdown").show();
      }
    });
    $("#pac_input").keyup(function () {
      if ($(this).val().length > 0) {
        $(".default-dropdown").hide();
        return;
      }
      $(".default-dropdown").show();
    });
    $(document).click(function (event) {
      if (!$(event.target).is("#pac_input")) {
        $(".default-dropdown").hide();
      }
    });
    $(document).keyup(function (e) {
      if (e.key === "Escape") {
        $(".default-dropdown").hide();
      }
    });
  });