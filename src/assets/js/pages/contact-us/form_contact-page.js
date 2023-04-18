const email_input = document.querySelector("input[name=email]");
const error_label = document.querySelector("input[name=email] + .form_input-error-message");
const phone_input = document.getElementById("contact-page_input-phone");

email_input.addEventListener("change", () => {
  let email = email_input.value;

  if (validateEmail(email)) {
    //   email_input.classList.remove("invalid");
    error_label.style.display = "none";
    phone_input.disabled = false;
  } else {
    //   email_input.classList.add("invalid");
    error_label.style.display = "block";
    phone_input.disabled = true;
  }
});

function validateEmail(email) {
  const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email_regex.test(email);
}