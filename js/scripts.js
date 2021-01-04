const btnSend = document.querySelector('#send');
const btnReset = document.querySelector('#resetBtn');
const emailField = document.querySelector('#email');
const subjectField = document.querySelector('#subject');
const messageField = document.querySelector('#message');
const form = document.querySelector('#send-email');
const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners(){
    //On start
    document.addEventListener('DOMContentLoaded',startApp);
    //Fields
    emailField.addEventListener('blur',validateForm);
    subjectField.addEventListener('blur',validateForm);
    messageField.addEventListener('blur',validateForm);
    //Reseting
    btnReset.addEventListener('click',resetForm);
    //Sending
    form.addEventListener('submit',sendEmail);
}

//Functions
function startApp(){
    btnSend.disabled = true;
    btnSend.classList.add('cursor-not-allowed','opacity-50');
}
function validateForm(e){
    if(e.target.value != ""){
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-green-500');
    } else{
        e.target.classList.add('border','border-red-500');
        showError("All fields are required");
    }
    if(e.target.type === 'email'){
        if(regEx.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border','border-green-500');
        } else {
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500');
            showError("Select a valid email");
        }
    }
    if(regEx.test(emailField.value) && subjectField.value !== '' && messageField.value !== ''){
        btnSend.disabled = false;
        btnSend.classList.remove('cursor-not-allowed','opacity-50');
    }
}

function showError(errorText){
 const errorMsg = document.createElement('p');
 errorMsg.textContent = errorText;
 errorMsg.classList.add('border','border-red-500','background-red-100','text-red-500','p-3','mt-5','text-center','error');
 if(document.querySelectorAll('.error').length < 1) {
     form.appendChild(errorMsg);
 } 
}

function sendEmail(e){
    e.preventDefault();
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';
    setTimeout( () => {
        spinner.style.display = 'none';
        const confirmation = document.createElement('p');
        confirmation.textContent = "Email sent correctly";
        confirmation.classList.add('text-center','my-10','p-3','bg-green-500','text-white','font-bold','uppercase');
        form.insertBefore(confirmation,spinner);
        setTimeout( ()=>{
            confirmation.remove();
            resetForm();
            startApp();
        },3000)
    }, 3000)
}
function resetForm(){
    form.reset();
}