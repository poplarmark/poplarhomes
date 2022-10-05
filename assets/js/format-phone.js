<script type="text/javascript">
const cardNumber = document.getElementById("cardNumber");

cardNumber.oninput = (e) => {
  e.target.value = patternMatch({
      input: e.target.value,
      template: "xxxx xxxx xxxx xxxx",
   });
};

function patternMatch({
  input,
  template
}) {
  try {
    

    let j = 0;
    let plaintext = "";
    let countj = 0;
    while (j < template.length) {
      // code block to be
      
      if (countj > input.length - 1) {
        template = template.substring(0, j);
        break;
      }

      if (template[j] == input[j]) {
        j++;
        countj++;
        continue;
      }

      if (template[j] == "x") {
        template = template.substring(0, j) + input[countj] + template.substring(j + 1);
        plaintext = plaintext + input[countj];
        countj++;
      }
      j++;
    }

    return template
 
  } catch {
    return ""
  }
}
</script>