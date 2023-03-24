function phoneFormat() {
  // Format phone number to 10-digit US
  $("input[name=phone]").keyup(function (e) {
    var phone_input = this.value.replace(/\D/g, "").substring(0, 10);
    // Backspace and Delete keys
    var deleteKey = e.keyCode == 8 || e.keyCode == 46;
    var len = phone_input.length;
    if (len == 0) {
      phone_input = phone_input;
    } else if (len < 3) {
      phone_input = "(" + phone_input;
    } else if (len == 3) {
      phone_input = "(" + phone_input + (deleteKey ? "" : ") ");
    } else if (len < 6) {
      phone_input =
        "(" + phone_input.substring(0, 3) + ") " + phone_input.substring(3, 6);
    } else if (len == 6) {
      phone_input =
        "(" +
        phone_input.substring(0, 3) +
        ") " +
        phone_input.substring(3, 6) +
        (deleteKey ? "" : "-");
    } else {
      phone_input =
        "(" +
        phone_input.substring(0, 3) +
        ") " +
        phone_input.substring(3, 6) +
        "-" +
        phone_input.substring(6, 10);
    }
    this.value = phone_input;
  });
}
