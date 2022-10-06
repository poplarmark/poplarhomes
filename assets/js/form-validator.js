<script>
const webform = document.getElementById("form__indication");
const businessname = document.getElementById("input__business-name");
// const firstname = document.getElementsByName("first-name");
// const lastname = document.getElementsByName("last-name");
// const position = document.getElementsByName("position");
// const telephoney = document.getElementsByName("telephone");
// const website = document.getElementsByName("website");
// const email = document.getElementsByName("email");
// const managed_doors = document.getElementsByName("managed-doors");
// const average_rents = document.getElementsByName("average-rents");
// const monthly_door_fee = document.getElementsByName("monthly-door-fee");
// const cities = document.getElementsByName("cities");

webform.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  const businessnameValue = businessname.value;
//   const firstnameValue = firstname.value;
//   const lastnameValue = lastname.value;
//   const positionValue = position.value;
//   const websiteValue = website.value;
//   const managed_doors_value = managed_doors.value;
//   const average_rents_value = average_rents.value;
//   const monthly_door_fee_value = monthly_door_fee.value;
//   const citiesValue = cities.value;

  if (businessnameValue === "") {
    businessname.style.border = "1px solid red"
  }

//   if (firstnameValue === "") {
//     firstname.style.border = "1px solid red";
//   }

//   if (lastnameValue === "") {
//     lastname.style.border = "1px solid red";
//   }

//   if (positionValue === "") {
//     position.style.border = "1px solid red";
//   }
  
//   if (websiteValue === "") {
//     website.style.border = "1px solid red";
//   }

//   if (managed_doors_value === "") {
//     managed_doors.style.border = "1px solid red";
//   }
}
</script>