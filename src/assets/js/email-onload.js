// document.getElementById('input__date').value = Date();
document
  .getElementById("form-body--indication")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const serviceID = "service_4994rzd";
    const templateID = "template_eyh0ds8";
    // send the email here
    emailjs.sendForm(serviceID, templateID, this).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        // alert("SUCCESS!");
      },
      (error) => {
        console.log("FAILED...", error);
        // alert("FAILED...", error);
      }
    );
  });
