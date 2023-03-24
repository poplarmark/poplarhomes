  console.log("INITIALIZED RENT ESTIMATE");
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
        console.log('Google Sheet -->', data);
      },
    });
  };
  // Parse address from google.maps.api
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
  
  if (autocomplete_input) {
    var autocomplete_component;
    var autocomplete = new google.maps.places.Autocomplete(autocomplete_input, autocomplete_options);
    google.maps.event.addListener(autocomplete, "place_changed", function () {
      let place = autocomplete.getPlace().address_components;
      let zipcode = document.getElementById("rent-estimate_input-postal-code");
      let zipcode_initial_value = getGoogleAddressComponent(place, "postal_code", "short_name");
      zipcode.value = zipcode_initial_value;

      autocomplete_component = {
        city: getGoogleAddressComponent(place, "locality", "long_name"),
        route: getGoogleAddressComponent(place, "route", "short_name"),
        state: getGoogleAddressComponent(place,"administrative_area_level_1","short_name"),
        street_no: getGoogleAddressComponent(place,"street_number","long_name"),
        zip: zipcode.value,
      };
       // Test zipcode validity
      zipcode.addEventListener('change', function() {
        let zipcode_value = zipcode.value;
        let zipcode_error_message = document.getElementsByClassName("error_message_zipcode")[0];
        if (checkZip(zipcode_value)) {
          autocomplete_component.zip = this.value;
          console.log("Updated zipcode.value:", this.value)
        }
        if (zipcode_value == 'undefined') {
          zipcode.value = '';
        }
        else {
          zipcode_error_message.style.display = "block";
        }
      });
  
      console.log("ADDRESS:", autocomplete_component);
    });
  }
  
  $(document).ready(function () {
    // Function for moving google autocomplete api to designated input field which is #pac_input
    autocompleteBindLocation();
    // Function for formatting phone
    phoneFormat();
    // Form rent estimate event handler
    form_rent_estimate.addEventListener('submit', (event) => {
      event.preventDefault();
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
        "Chicago",
        "Chino",
        "Chula Vista",
        "Churchton",
        "Citrus Heights",
        "City Of Industry",
        "Claremont",
        "Clarksburg",
        "Clarksville",
        "Clayton",
        "Cleveland",
        "Clinton",
        "College Park",
        "Colton",
        "Columbia",
        "Columbus",
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
        "San Antonio",
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
        "Saint Louis",
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
        "St. Louis",
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
        "Winston-Salem",
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
        // Update content to Local Partners if under this city
        if (autocomplete_component?.state &&
          (autocomplete_component.state === "TX" ||
           autocomplete_component.state === "SC" ||
           autocomplete_component.state === "MO" ||
           autocomplete_component.state === "IL" ||
           autocomplete_component.state === "NC" ||
           autocomplete_component.state === "OH") &&
           autocomplete_component?.city && isLocalPartner) {
             // Open subsidiary modal
             wf_form_main.style.display = "block;"
             const wf_form_main_header = document.querySelector("#serviced-block_trigger-layer .modal_component > .modal_heading");
             wf_form_main_header.innerHTML = "One of our local partners serves your area!"; 
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
             wf_form_main.style.display = "block";
           }
       else {
        $(".address-map").attr("src","https://www.google.com/maps?q=" + autocomplete_input.value + "&output=embed");
        // Open unserviced modal
        wf_form_unserviced.style.display = "block";
       // return false;
       }
    });
    // Form serviced event handler
    form_serviced.addEventListener('submit', (event) => {
      event.preventDefault();
      let property = {
        type: property_type.value,
        propertyCategory: $("#property-type option:selected").attr("category_value"),
        numBeds: bedroom_count.value,
        numBaths: bathroom_count.value,
        street: autocomplete_component ? autocomplete_component.street_no + " " + autocomplete_component.route : autocomplete_input.value,
        city: autocomplete_component && autocomplete_component.city ? autocomplete_component.city: "",
        state: autocomplete_component ? autocomplete_component.state : "",
        zipCode: autocomplete_component ? autocomplete_component.zip : "",
      };

      let user = {
        firstName: serviced_input_firstname.value,
        lastName: serviced_input_lastname.value,
        email: serviced_input_email.value,
        phone: serviced_input_phone.value,
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

      let modal_loading = document.getElementsByClassName("modal_loading-box")[0];
      let modal_heading = document.querySelector(".modal_component > .modal_heading");
      modal_heading.style.display = "none";
      form_serviced.style.display = "none"; // Hide form_serviced
      modal_loading.style.display = "flex"; // Show loading display

      console.log(utm);
      registerOwner(user, property, utm);
      // Reload page after submission
      // setTimeout(function() {
      //   window.location.reload();
      // }, 5000);
      form_rent_estimate.reset();
      form_serviced.reset();
      return false;
    });
    // Form unserviced event handler
    form_unserviced.addEventListener('submit', (event) => {
      event.preventDefault();
        const fullName = unserviced_input_fullname.value,
              email = unserviced_input_email.value,
              propertyAddress = autocomplete_input.value,
              propertyType = property_type.value,
              bedrooms = bedroom_count.value,
              bathrooms = bathroom_count.value,
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
        let form_unserviced_button_close = document.querySelector("#unserviced-block_trigger-layer .modal_component > .modal_button-close");
        let modal_loading = document.getElementsByClassName("modal_loading-box")[1];
        let modal_heading = document.querySelector(".modal_component > .modal_heading.for-modal-unserviced");
        let modal_subheading = document.querySelector(".modal_component > .text-color-white.for-modal-unserviced");
        unserviced_map.style.display = "none";
        modal_heading.style.display = "none";
        modal_subheading.style.display = "none";
        form_unserviced_button_close.style.display = "none"; // Hide close button 
        form_unserviced.style.display = "none"; // Hide form_unserviced
        modal_loading.style.display = "flex";
        // Send to Google Sheet for piping
        pipeToGoogleSheet("https://script.google.com/macros/s/AKfycbwZSqwAs6FBluPYSz1kTQwVRFCA4KDXV85rvFUcIVplO97w_Mq6ZW2D2cm3afKpnnvG/exec", googleSheetData);     
        // Reload page after submission
        // setTimeout(function() {
        //   window.location.reload();
        // }, 5000);
        form_rent_estimate.reset();
        form_unserviced.reset();
        return false;
    });
  });

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
            Location: autocomplete_input.value,
            "Submission Error": "true",
            utm_source: `WEB-${utm.UTMSource}`,
            utm_campaign: `${utm.UTMCampaign}`,
            utm_medium: `${utm.UTMMedium}`,
            utm_content: `${utm.UTMContent}`,
          };

          pipeToGoogleSheet("https://script.google.com/macros/s/AKfycbwdTw0XzSPs4Y1Fou6jdLToblFjZneJZGRd2EEowbOMpTgX5te8/exec", googleSheetData);
          return false;
        }
        let token = res.data.registerOwner.token;
        addProperty(property, utm, token);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Function for moving google autocomplete to input field id=pac_input
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

  // Zipcode validation
  function checkZip(value) {
    return (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);
  }