$(document).ready(function () {
  $('input[name="postal_code"]').change(function () {
    $('input[name="original_property_zip_code"]').val($(this).val());
  });
}),
  $(document).ready(function () {
    $('input[name="rent_bedroom"]').change(function () {
      $('input[name="original_number_of_bedrooms"]').val($(this).val());
    });
  }),
  $(document).ready(function () {
    $('input[name="rent_bathroom"]').change(function () {
      $('input[name="original_number_of_bathrooms"]').val($(this).val());
    });
  }),
  $(document).ready(function () {
    $("#property-type").change(function () {
      $('input[name="original_property_type"]').val(this.value);
    });
  });
