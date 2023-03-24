function rentEstimate() {
  document.addEventListener("DOMContentLoaded", function() {    
    // Function for moving google autocomplete api to designated input field which is #pac_input
    autocompleteBindLocation();
    // Function for formatting phone
    phoneFormat();
    // Form rent estimate event handler
    form_rent_estimate.addEventListener('submit', (event) => {
      event.preventDefault();
      const cities = getPoplarLocations();
      console.log("cities:", cities)
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
}
  