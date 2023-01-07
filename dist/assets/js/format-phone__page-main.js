<script>
const phone__serviced=document.getElementById("serviced_input-phone");function autoFormatPhoneNumber(e){try{var t=(""+e).replace(/\D/g,"").match(/^(1|)?(\d{0,3})?(\d{0,3})?(\d{0,4})?$/);return[t[1]?"+1 ":"",t[2]?"(":"",t[2],t[3]?") ":"",t[3],t[4]?"-":"",t[4]].join("")}catch(e){return""}}phone__serviced.oninput=e=>{e.target.value=autoFormatPhoneNumber(e.target.value)};
//# sourceMappingURL=format-phone__page-main.js.map
</script>