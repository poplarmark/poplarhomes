// Form phone formatter
const subsidiary_phone = document.getElementById("subsidiary_input-phone");
subsidiary_phone.oninput = (e) => {
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