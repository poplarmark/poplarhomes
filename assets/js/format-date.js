<script>
const dateInput = document.getElementById('input__date');
dateInput.value = new Date().toISOString().split('T')[0];

console.log(new Date().toISOString().split('T')[0]);

</script>