<script>
const form = document.getElementById('form__indication');
const businessName = document.getElementById('input__business-name');
const firstName = document.getElementById('input__first-name');
const lastName = document.getElementById('input__last-name');
const position = document.getElementById('input__position');
const mobile = document.getElementById('input__telephone');
const email = document.getElementById('input__email');
const managedDoors = document.getElementById('input__managed-doors');
const averageRents = document.getElementById('input__average-rents');
const monthlyDoorFee = document.getElementById('input__monthly-door-fee');
const cities = document.getElementById('input__cities');

//Show input error messages
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-wrapper error';
    const form_alert = formControl.querySelector('.form-alert');
    form_alert.innerText = message;
}

//show success colour
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-wrapper success';
}

//check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSucces(input)
    }else {
        showError(input,'Email is not valid');
    }
}

//check phone is valid
function checkMobile(input) {
    const re = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    if(re.test(input.value.trim())) {
        showSucces(input)
    }else {
        showError(input,'Phone is not invalid');
    }
}


//checkRequired fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input,`${getFieldName(input)} is required`)
        }else {
            showSucces(input);
        }
    });
}

//get FieldName
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event Listeners
form.addEventListener('submit',function(e) {
    e.preventDefault();

    checkRequired([businessName, firstName, lastName, position, email, managedDoors, averageRents, monthlyDoorFee, cities]);
    checkEmail(email);
    checkMobile(mobile);
    return;
});
</script>