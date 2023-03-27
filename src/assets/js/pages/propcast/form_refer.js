// for most forms
var Webflow = Webflow || [];
Webflow.push(function() {  
  // unbind webflow form handling (keep this if you only want to affect specific forms)
  $(document).off('submit');

  /* Any form on the page */
  $('#form_refer').submit(function(e) {
    e.preventDefault();
   
  	const $form = $(this); // The submitted form
    const $submit = $('[type=submit]', $form); // Submit button of form
    const buttonText = $submit.val(); // Original button text
    const buttonWaitingText = $submit.attr('data-wait'); // Waiting button text value
    const formMethod = $form.attr('method'); // Form method (where it submits to)
    const formAction = $form.attr('action'); // Form action (GET/POST)
    const formRedirect = $form.attr('data-redirect'); // Form redirect location
    const formData = $form.serialize(); // Form data
    
    // Set waiting text
    if (buttonWaitingText) {
      $submit.val(buttonWaitingText); 
    }
    
    $.ajax(formAction, {
    	data: formData,
      method: formMethod
    })
    .done((res) => {
      // If form redirect setting set, then use this and prevent any other actions
      if (formRedirect) { window.location = formRedirect; return; }

    	$form
      	 // optional hiding of form .hide()
    		.siblings('.w-form-done').show() // Show success
      	.siblings('.w-form-fail').hide(); // Hide failure
    })
    .fail((res) => {
      $form
      	.siblings('.w-form-done').hide() // Hide success
    	  .siblings('.w-form-fail').show(); // show failure
    })
    .always(() => {
      // Reset text
      $submit.val(buttonText);
    });
  });
});

// Form phone formatter
const refer_phone = document.getElementById("refer_input-phone")
refer_phone.oninput = (e) => {
  e.target.value = autoFormatPhoneNumber(e.target.value)
}

function autoFormatPhoneNumber(phoneNumberString) {
  try {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{0,3})?(\d{0,3})?(\d{0,4})?$/);
    var intlCode = match[1] ? "+1 " : "";
    return [intlCode, 
            match[2] ? "(": "",
            match[2], 
            match[3] ? ") ": "",
            match[3],
            match[4] ? "-": "",
            match[4]].join("")
    
  } catch(err) {
    return "";
  }
}