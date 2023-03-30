var Webflow = Webflow || [];
Webflow.push(function () {

  // unbind webflow form handling (keep this if you only want to affect specific forms)
  $(document).off("submit");
  
  /* Any form on the page */
  $("#form_contact-us").submit(function (e) {
    e.preventDefault();

    const $form = $(this); // The submitted form
    const $submit = $("[type=submit]", $form); // Submit button of form
    const buttonText = $submit.val(); // Original button text
    const buttonWaitingText = $submit.attr("data-wait"); // Waiting button text value
    const formMethod = $form.attr("method"); // Form method (where it submits to)
    const formAction = $form.attr("action"); // Form action (GET/POST)
    const formRedirect = $form.attr("data-redirect"); // Form redirect location
    const formData = $form.serialize(); // Form data
    const formHeader = document.querySelector(".form_contact-us-wrapper > .modal_heading");
    const formID = $form.attr("id");

    // Set waiting text
    if (buttonWaitingText) {
      $submit.val(buttonWaitingText);
    }

    // Check form ID's if need this script
    $.ajax(formAction, {
      data: formData,
      method: formMethod,
    })
    .done((res) => {
      // If form redirect setting set, then use this and prevent any other actions
      if (formRedirect) {
        window.location = formRedirect;
        return;
      }

      $form
        .hide() // optional hiding of form
        .siblings(".w-form-done")
        .show() // Show success
        .siblings(".w-form-fail")
        .hide(); // Hide failure
        formHeader.style.display = "none";
    })
    .fail((res) => {
      $form
        .siblings(".w-form-done")
        .hide() // Hide success
        .siblings(".w-form-fail")
        .show(); // show failure
    })
    .always(() => {
      // Reset text
      $submit.val(buttonText);
    });
  });
});

phoneFormat();
