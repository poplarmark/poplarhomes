var Webflow = Webflow || [];
Webflow.push(function () {
  $("#form__modal-contact").submit(function (event) {
    setTimeout(function () {
      location.reload(true);
    }, 3000);
  });
});