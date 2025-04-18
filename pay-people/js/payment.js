//Declare variables
let transactionList = [];
let isEmailValid = false;
let isAmountValid = false;
let toEmail = document.getElementById("toEmail").value;
let fromEmail = document.getElementById("fromEmail").value;
let amount = Number(document.getElementById("amount").value);
const paymentBtn = document.getElementById('paymentBtn');


//When Payment Page Load
function loadPaymentPage() {
    paymentBtn.disabled = true;
    let loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUser"));
    transactionList = JSON.parse(localStorage.getItem("transactionList"));
    if (!transactionList) {
        transactionList = [];
    }
    if (loggedInUserDetails && loggedInUserDetails.email) {
        document.getElementById("fromEmail").value = loggedInUserDetails.email;
        fromEmail = loggedInUserDetails.email;
        document.getElementById("fromEmail").disabled = true;
    }
}

function validateEmail(email) {
    let userList = [];
    let allowedEmails = [];

    userList = JSON.parse(localStorage.getItem("userList"));
    if (userList.length > 0) {
        userList.forEach(user => {
            allowedEmails.push(user.email);
        });
    }
    return allowedEmails.includes(email);
}

//Function - When Pay button is clicked
function doPayment() {
    let allowPayment = true;
    amount = Number(amount);
    let currentBalance = Number(JSON.parse(localStorage.getItem("walletBalance")));
    if (amount > currentBalance) { allowPayment = false; }
    if (allowPayment) {
        let payload = {
            "toEmail": toEmail,
            "fromEmail": fromEmail,
            "amount": amount,
            "paymentStatus": "Success",
            "date": getCurrentDate()
        }
        transactionList.push(payload);
        localStorage.setItem("transactionList", JSON.stringify(transactionList));
        showToastMessage("Payment is Successfull. Redirecting to Dashboard...", 'toast-success');
        setTimeout(() => {
            window.location.href = "home.html";
        }, 3500);
    } else {
        showToastMessage("Payment is failed. Wallet balance is too low to make this payment", 'toast-error');
    }
}


//Function to get current date as dd/mm/yyyy format
function getCurrentDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;
}

function formValidationCheckForEmail(event) {
    toEmail = event.target.value;
    let isValid = true;
    const regexEmail = /^[^@]+@[^@]+\.[^@]+$/;
    //Regex check for email
    if (!regexEmail.test(toEmail)) {
        isValid = false;
    }
    if (fromEmail === toEmail) {
        isValid = false;
    }
    if (toEmail && !validateEmail(toEmail)) {
        isValid = false;
    }
    isEmailValid = isValid;
    isFormValid();
}
function formValidationCheckForAmount(event) {
    amount = event.target.value;
    let isValid = true;
    const regexAmount = /^\d+(\.\d{1,2})?$/;
    let regexTwoDecimal = /^\d+(\.\d{0,2})?$/;

    if (!regexTwoDecimal.test(amount)) {
        event.target.value = amount.slice(0, -1);
        amount = event.target.value;
    }
    //Regex check for amount
    if (!regexAmount.test(amount)) {
        isValid = false;
    }
    //If amount entered is greater than 75000
    if (amount && (Number(amount) > 75000 || Number(amount) == 0)) {
        isValid = false;
    }
    isAmountValid = isValid;
    isFormValid();
}

function isFormValid() {
    if (isEmailValid && isAmountValid) {
        paymentBtn.disabled = false;
    } else {
        paymentBtn.disabled = true;
    }
}
loadPaymentPage();

