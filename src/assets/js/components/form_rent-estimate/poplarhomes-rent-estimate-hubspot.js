console.log("initialized: rent estimate V.0.1.1");
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
const rent_estimate_button = document.getElementById("rent-estimate_button");
// Form serviced form fields
const serviced_input_location = document.getElementById("re-serviced_property_address");
const serviced_input_zipcode = document.getElementById("re-serviced_zipcode");
const serviced_input_state = document.getElementById("re-serviced_state");
const serviced_input_city = document.getElementById("re-serviced_city");
const serviced_input_street = document.getElementById("re-serviced_street");
const serviced_input_bedroom = document.getElementById("re-serviced_number_of_bedroom");
const serviced_input_bathroom = document.getElementById("re-serviced_number_of_bathroom");
const serviced_input_firstname = document.getElementById("re-serviced_firstname");
const serviced_input_lastname = document.getElementById("re-serviced_lastname");
const serviced_input_email = document.getElementById("re-serviced_email");
const serviced_input_phone = document.getElementById("re-serviced_phone");
const serviced_input_property_type = document.getElementById("re-serviced_property_type");
const serviced_input_unit_type = document.getElementById('re-serviced_unit_type__c');
// Form unserviced form fields
const unserviced_input_location = document.getElementById("re-unserviced_property_address");
const unserviced_input_zipcode = document.getElementById("re-unserviced_zipcode");
const unserviced_input_state = document.getElementById("re-unserviced_state");
const unserviced_input_city = document.getElementById("re-unserviced_city");
const unserviced_input_street = document.getElementById("re-unserviced_street");
const unserviced_input_bedroom = document.getElementById("re-unserviced_number_of_bedroom");
const unserviced_input_bathroom = document.getElementById("re-unserviced_number_of_bathroom");
const unserviced_input_fullname = document.getElementById("re-unserviced_input-fullname");
const unserviced_input_email = document.getElementById("re-unserviced_input-email");
const unserviced_input_property_type = document.getElementById("re-unserviced_property_type");
const unserviced_map = document.getElementById("unserviced_map");
// Close buttons
const close_button_modal_serviced = document.getElementById("button_close-modal_serviced");
const close_button_form_serviced = document.getElementById("button_close-form_serviced");

// Google API autocomplete restriction options
const autocomplete_options = {
  componentRestrictions: { country: "us" },
};

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
      let zipcode_error_message = document.getElementsByClassName("error_message_zipcode")[0];
      if (checkZip(this.value)) {
        zipcode_error_message.style.display = "none";
        rent_estimate_button.disabled = false;
        rent_estimate_button.style.opacity = "1";
        autocomplete_component.zip = this.value;
        // console.log("Updated zip_value:", this.value) 
      }
      else {
        rent_estimate_button.disabled = true;
        rent_estimate_button.style.opacity = "0.5";
        zipcode_error_message.style.display = "block";
      }
    });

      // Mirror the value to serviced input values
      serviced_input_location.value = autocomplete_input.value;
      unserviced_input_location.value = autocomplete_input.value;
      serviced_input_zipcode.value = autocomplete_component.zip;
      unserviced_input_zipcode.value = autocomplete_component.zip;
      serviced_input_street.value = autocomplete_component.route+autocomplete_component.street_no;
      unserviced_input_street.value = autocomplete_component.route+autocomplete_component.street_no;

      // Create a new option element for city dropdown
      const new_option_city = document.createElement('option');
      new_option_city.value = autocomplete_component.city;
      new_option_city.textContent = autocomplete_component.city;
      new_option_city.selected = true; // Set the option as selected
      // Add the new option to the select element
      serviced_input_city.appendChild(new_option_city);
      unserviced_input_city.appendChild(new_option_city);

      // Create a new option element for state dropdown
      const new_option_state = document.createElement('option');
      new_option_state.value = autocomplete_component.state;
      new_option_state.textContent = autocomplete_component.state;
      new_option_state.selected = true; // Set the option as selected
      // Add the new option to the select element
      serviced_input_state.appendChild(new_option_state);
      unserviced_input_state.appendChild(new_option_state);

    console.log("ADDRESS:", autocomplete_component);
  });
}

// Function for moving google autocomplete api to designated input field which is #pac_input
autocompleteBindLocation();
$(document).ready(function () {
  // Function for formatting phone
  phoneFormat();
  // Form rent estimate event handler
  form_rent_estimate.addEventListener('submit', (event) => {

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
     // Mirror property_type values
      const property_type_value = property_type.value;
      console.log("property_type_value: ", property_type_value);
      serviced_input_property_type.value = property_type_value;
      unserviced_input_property_type.value = property_type_value;
      console.log("serviced_property_type_value:", serviced_input_property_type.value);
    /* const serviced_input_unit_type_value = serviced_input_unit_type.value;
     * if (property_type_value === "Townhouse") {
     *   // Create a new option element for state dropdown
     *   const new_option_unite_type = document.createElement('option');
     *   new_option_unite_type.value = "Unit";
     *   new_option_unite_type.textContent = "Unit";
     *   new_option_unite_type.selected = true; // Set the option as selected
     *   // Add the new option to the select element
     *  serviced_input_unit_type.appendChild(new_option_unite_type);
     * }
     */
      // Mirror bedroom count values
      const bedroom_count_value = bedroom_count.value;
      console.log("bedroom_count_value: ", bedroom_count_value);
      serviced_input_bedroom.value = bedroom_count_value;
      unserviced_input_bedroom.value = bedroom_count_value;
      console.log("serviced_input_bedroom_value: ",serviced_input_bedroom.value);
      // Mirror bathroom count values
      const bathroom_count_value = bathroom_count.value;
      console.log("bathroom_count_value: ", bathroom_count_value);
      serviced_input_bathroom.value = bathroom_count_value;
      unserviced_input_bathroom.value = bathroom_count_value;
      console.log("serviced_input_bathroom_value: ",serviced_input_bathroom.value);

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
      this.style.display = "block";
      }
    });
});


// Function for moving google autocomplete to input field id=pac_input
function autocompleteBindLocation() {
  // move .pac-container inside #input_wrap-location
  window.addEventListener("load", function () {
    let pasted_input = document.getElementById("pac_input");
    let child = document.getElementsByClassName("pac-container")[0];
    let destination = document.getElementById("input_wrap-location");
    let fragment = document.createDocumentFragment();
    fragment.appendChild(child);
    destination.appendChild(fragment);
    // prevent user from copy/pasting input values;
    // user must only select value from autocomplete
    pasted_input.onpaste = (e) => e.preventDefault();
    console.log("google.maps.api: binded");
  });
}

// Modal buttons


// Zipcode validation
function checkZip(value) {
  return (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);
}

