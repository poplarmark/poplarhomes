var queryString = window.location.search;
console.log(queryString);
// ?utm_source=facebook&utm_medium=post&utm_campaign=webflow
var URLSearchParams_wb = new URLSearchParams(queryString);

const utmParameters = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_terms",
];

for (const utm_element of utmParameters) {
  /* if utm_source exist */
  $("form").each(function (index) {
    if (URLSearchParams_wb.has(utm_element)) {
      console.log(utm_element + " exists");
      /* get UTM value of this UTM parameter */
      var value = URLSearchParams_wb.get(utm_element);
      /* change form hidden field to this UTM URL value */
      $(this)
        .find("." + utm_element)
        .val(value);
    }
  });
} /* End for loop */