const webform = document.getElementById("#form__indication");
const businessname = document.getElementsByName("business-name");
const firstname = document.getElementsByName("first-name");
const lastname = document.getElementsByName("last-name");
const position = document.getElementsByName("position");
const telephone = document.getElementsByName("telephone");
const website = document.getElementsByName("website");
const email = document.getElementsByName("email");
const managed_doors = document.getElementsByName("managed-doors");
const average_rents = document.getElementsByName("average-rents");
const monthly_door_fee = document.getElementsByName("monthly-door-fee");
const cities = document.getElementsByName("cities");

webform.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  const businessnameValue = businessname.value;
  const firstnameValue = firstname.value;
  const lastnameValue = lastname.value;

  if (businessnameValue === "") {
    businessname.style.border = "1px solid red"
  }

  if (firstnameValue === "") {
    firstname.style.border = "1px solid red";
  }

  if (lastnameValue === "") {
    lastname.style.border = "1px solid red";
  }
}