<script>
document.getElementById("form-body--indication").addEventListener("submit",(function(e){e.preventDefault();emailjs.sendForm("service_4994rzd","template_eyh0ds8",this).then((e=>{console.log("SUCCESS!",e.status,e.text)}),(e=>{console.log("FAILED...",e)}))}));
//# sourceMappingURL=email-onload.js.map
</script>