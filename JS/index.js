// SignUp info:
var userName = document.getElementById("userName");
var signUpPassword = document.querySelector("#signUpPassword");
var signUpEmail = document.getElementById("signUpEmail");
var signUpBtn = document.querySelector(".signUp-btn");

// Validate
var Success = document.querySelector("#success");

// Instruction of password
var passwordInstruction = document.querySelector("#passfollow");

// Allocate fields:
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const errorMessage = document.getElementById('errorMessage');
const loginBtn = document.getElementById('login');

// Welcome page
var welcomePage = document.getElementById("welcome");

// Container that stores users
var userContainer = [];
if (localStorage.getItem("userInfo") != null) {
  userContainer = JSON.parse(localStorage.getItem("userInfo"));
}

/* ************************* Sign UP *************************** */
function signUp() {
  // Check if all validations are successful
  if (isEmailExist()) {
    Success.innerHTML = '<span class="text-danger m-3 fs-5">Email already exists</span>';
    return; // Stop execution if email exists
  }
  if (isEmpty()) {
    Success.innerHTML = '<span class="text-danger m-3 fs-5">Please fill in all fields</span>';
    return; // Stop execution if fields are empty
  }

  if (
    !validateName(userName) ||
    !validateEmail(signUpEmail) ||
    !validatePassword(signUpPassword)
  ) {
    passwordInstruction.innerHTML = `<span class="text-danger  passfollow">
      At least 8 characters, including a letter, a number, and a special character (@$!%*?&).
    </span>`;
  } else {
    var userInfo = {
      userName: userName.value,
      email: signUpEmail.value,
      password: signUpPassword.value,
    };
    userContainer.push(userInfo);
    localStorage.setItem("userInfo", JSON.stringify(userContainer));
    clearForm();
    Success.innerHTML = '<span class="text-success text-center fs-5">Sign-up successful! Redirecting...</span>';
    // Redirect to the login page after 2 seconds
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  }
}

// Check if email already exists
function isEmailExist() {
  return userContainer.some(user => user.email.toLowerCase() === signUpEmail.value.toLowerCase());
}

// Check if any field is empty
function isEmpty() {
  return userName.value === "" || signUpEmail.value === "" || signUpPassword.value === "";
}

/** Validations fields */
// Name validation
function validateName(elem) {
  var regexName = /^[a-zA-Z\s]{2,50}$/;
  if (regexName.test(elem.value)) {
    elem.classList.add("is-valid");
    elem.classList.remove("is-invalid");
    return true;
  } else {
    elem.classList.add("is-invalid");
    elem.classList.remove("is-valid");
    return false;
  }
}

// Email validation
function validateEmail(elem) {
  var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (regexEmail.test(elem.value)) {
    elem.classList.add("is-valid");
    elem.classList.remove("is-invalid");
    return true;
  } else {
    elem.classList.add("is-invalid");
    elem.classList.remove("is-valid");
    return false;
  }
}

// Password validation
function validatePassword(elem) {
  var regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (regexPassword.test(elem.value)) {
    elem.classList.add("is-valid");
    elem.classList.remove("is-invalid");
    return true;
  } else {
    elem.classList.add("is-invalid");
    elem.classList.remove("is-valid");
    return false;
  }
}

// Form submission for Sign Up
signUpBtn?.addEventListener("click", signUp);

/* **************************************************** */
//---------------------- Sign In ---------------------- //
function isExactLogin() {
  return userContainer.some(user => user.email === loginEmail.value && user.password === loginPassword.value);
}

function login() {
  errorMessage.innerHTML = ''; // Clear previous messages

  if (loginEmail.value === "" || loginPassword.value === "") {
    errorMessage.innerHTML = `<span class="text-danger fs-5">Please fill in all fields.</span>`;
  } else if (!isExactLogin()) {
    errorMessage.innerHTML = `<span class="text-danger">Invalid email or password.</span>`;
  } else {
    // Retrieve the username of the logged-in user
    const loggedInUser = userContainer.find(user => user.email === loginEmail.value);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser)); // Store the logged-in user info

    errorMessage.innerHTML = `<span class="text-success">Login successful! Redirecting...</span>`;
    setTimeout(() => {
      window.location.href = "welcome.html"; // Redirect after 2 seconds
    }, 2000);
  }
}

// Optional Chaining (?.)
// The ?. is an optional chaining operator.
// It ensures that the addEventListener method is only called if loginBtn is not null or undefined.
// If loginBtn is null or undefined, the code will safely do nothing instead of throwing an error.

// Form submission for Login
loginBtn?.addEventListener("click", login);

// Clear forms
function clearForm() {
  userName.value = "";
  signUpPassword.value = "";
  signUpEmail.value = "";
}
function clearLoginForm() {
  loginEmail.value = "";
  loginPassword.value = "";
}

// Welcome page display
function welcome() {
  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")); // Retrieve the logged-in user info
  if (loggedInUser) {
    welcomePage.innerHTML = `Welcome, ${loggedInUser.userName}!`; // Display the username
  } else {
    welcomePage.innerHTML = `Welcome, Guest!`;
  }
}

// Call welcome function on page load
if (welcomePage) {
  welcome();
}

// ---------------------------------------------------//
// for logout
function logout() {
  localStorage.removeItem('sessionUsername')
}
var signout = document.getElementById("Logout");
signout?.addEventListener("click", logout);