const API_URL = 'https://jsonplaceholder.typicode.com';
let userList = [];
let loggedInUserDetails = {};

//Click to go to dashboard
function login() {
    let inputEmail = document.getElementById("email").value;
    let inputUsername = document.getElementById("username").value;
    let emailError = document.getElementById("emailError");
    let usernameError = document.getElementById("usernameError");
    let isValid = true;

    // Clear previous error messages
    emailError.textContent = "";
    usernameError.textContent = "";

    //Validate E-mail
    if (!inputEmail) {
        emailError.textContent = "Email is required.";
        isValid = false;
    } else {
        let emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailRegex.test(inputEmail)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }
    }

    // Validate username
    if (!inputUsername) {
        usernameError.textContent = "Username is required.";
        isValid = false;
    }

    //Form is valid
    if (isValid) {
        //Check user recently login or not 
        let alreadyLoggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!alreadyLoggedUser) {
            //if not then clear data from stroage
            removeItemFromStroage();
        }
        else {
            if (alreadyLoggedUser && alreadyLoggedUser.email !== inputEmail && alreadyLoggedUser.username !== inputUsername) {
                removeItemFromStroage();
            }
        }

        //Find user from user List
        const user = findUser(inputEmail, inputUsername);

        //If user found from user list - Login Success
        if (user) {
            loggedInUserDetails = user;
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            showToastMessage("Login Successfully. Redirecting to dashboard... ", 'toast-success');
            setTimeout(() => {
                window.location.href = "home.html";
            }, 3000)

        }
        //If user not found from the user list - Login Failed
        else {
            showToastMessage("Failed to login. Incorrect username or email.", 'toast-error');
        }
    }

}

//Input email validation - Clear validation message
function onInputEmail() {
    document.getElementById("emailError").textContent = "";
}

//Input username validation - Clear validation message
function onInputUsername() {
    document.getElementById("usernameError").textContent = "";

}
//Remove data from  storage
function removeItemFromStroage() {
    localStorage.removeItem("transactionList");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("walletBalance");
}

//Fund user from userlist with email & username
function findUser(email, username) {
    if (userList.length > 0) {
        return userList.find(user => user.email === email && user.username === username);
    }
}

//Fetch list of user from API
async function getUserList() {
    try {
        const response = await fetch(`${API_URL}/users`);
        if (response.ok && response.status === 200) {
            const data = await response.json();
            userList = data;
            localStorage.setItem("userList", JSON.stringify(data));
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//Method Call when Page Load
getUserList();

