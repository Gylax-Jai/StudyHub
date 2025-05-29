let registerbtn = document.querySelector(".loginregister");

registerbtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("i am clicked");
  window.location.href = "/login";
});

// Function to clear login fields
function clearLoginFields() {
 const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
  if (emailInput) emailInput.value = '';
  if (passwordInput) passwordInput.value = '';
}

// Clear fields on page load
window.onload = function () {
  clearLoginFields();
};

// Clear fields when page becomes visible (handles back/forward navigation)
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    clearLoginFields();
  }
});

// Clear fields when page gains focus (handles tab switching)
window.addEventListener('focus', function() {
  clearLoginFields();
});




const form = document.querySelector("form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

let valid;

function validateUsername() {
  const username = usernameInput.value.trim();
  if (username.length <= 2) {
    alert("Username must be more than 2 characters.");
    valid = false;
  }
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    valid = false;
  }
}

function validatePassword() {
  const password = passwordInput.value;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
  if (!passwordRegex.test(password)) {
    alert("Password must be at least 7 characters long and contain at least one letter, one number, and one special character.");
    valid = false;
  }
}

function validateConfirmPassword() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    valid = false;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  valid = true; // reset before validation

  validateUsername();
  validateEmail();
  validatePassword();
  validateConfirmPassword();

  if (valid) {
    form.submit();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".inputbox input");

  setTimeout(() => {
    inputs.forEach((input) => {
      const toggleFilledClass = () => {
        if (input.value.trim() !== "") {
          input.classList.add("filled");
        } else {
          input.classList.remove("filled");
        }
      };
      toggleFilledClass(); // initial check after autofill
      
      input.addEventListener("input", toggleFilledClass);
      input.addEventListener("blur", toggleFilledClass);
    });
  }, 100); // allow autofill to complete
});
