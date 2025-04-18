
//function go to dashboard
function goToDashboard(){
    window.location.href = "home.html";
}

//gotoPayment method
function gotoPayment() {
    window.location.href = "payment.html";
}

//logout method
function logout() {
    window.location.href = "login.html";
}


function showToastMessage(message, statusClass) {
    let x = document.getElementById("snackbar");
    x.innerText = message 
    x.className = "show";
    x.classList.add(statusClass);
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }


