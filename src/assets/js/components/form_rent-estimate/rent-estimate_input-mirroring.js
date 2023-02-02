$(document).ready(function () {
  $("#pac_input").oninput(function () {
    $('input[name="location"]').val($(this).val());
  });
}),
  $(document).ready(function () {
    $('input[name="postal_code"]').change(function () {
      $('input[name="zipcode"]').val($(this).val());
    });
  }),
  $(document).ready(function () {
    $('input[name="rent_bedroom"]').change(function () {
      $('input[name="bedrooms"]').val($(this).val());
    });
  }),
  $(document).ready(function () {
    $('input[name="rent_bathroom"]').change(function () {
      $('input[name="bathrooms"]').val($(this).val());
    });
  }),
  $(document).ready(function () {
    $("#property-type").change(function () {
      $('input[name="property_type"]').val(this.value);
    });
  })