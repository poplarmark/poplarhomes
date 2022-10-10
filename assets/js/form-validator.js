<script>
const form = document.getElementById('form__indication2');
const businessName = document.getElementById('input__business-name2');
const firstName = document.getElementById('input__first-name2');
const lastName = document.getElementById('input__last-name2');
const position = document.getElementById('input__position2');
const mobile = document.getElementById('input__telephone2');
const email = document.getElementById('input__email2');
const managedDoors = document.getElementById('input__managed-doors2');
const averageRents = document.getElementById('input__average-rents2');
const monthlyDoorFee = document.getElementById('input__monthly-door-fee2');
const cities = document.getElementById('input__cities2');

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
            showError(input,`This field is required`)
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