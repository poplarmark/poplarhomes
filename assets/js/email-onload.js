<script type="text/javascript">
document
  .getElementById("blk-form__inidication-body")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const serviceID = "service_4994rzd";
    const templateID = "template_eyh0ds8";

    // send the email here
    emailjs.sendForm(serviceID, templateID, this).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("SUCCESS!");
      },
      (error) => {
        console.log("FAILED...", error);
        alert("FAILED...", error);
      }
    );
  });
</script>
