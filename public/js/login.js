let registerbtn = document.querySelector(".register");
registerbtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("i am clicked");
  window.location.href = "/signup";
});

// Function to clear login fields
function clearLoginFields() {
  const emailInput = document.querySelector('input[name="email"]');
  const passwordInput = document.querySelector('input[name="password"]');
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
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

let valid;

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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  valid = true; // reset before validation
  validateEmail();
  validatePassword();
  if (valid) { 
    // Before submitting, change autocomplete back to normal values
    emailInput.setAttribute('autocomplete', 'username');
    passwordInput.setAttribute('autocomplete', 'current-password');
    form.submit(); 
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".inputbox input");
  
  // Enhanced focus handling for better autofill control
  inputs.forEach((input) => {
    // When user focuses on input, enable autofill
    input.addEventListener("focus", function() {
      if (this.name === "email") {
        this.setAttribute('autocomplete', 'username');
      } else if (this.name === "password") {
        this.setAttribute('autocomplete', 'current-password');
      }
    });
    
    // When user leaves input, disable autofill again
    input.addEventListener("blur", function() {
      setTimeout(() => {
        if (this.name === "email") {
          this.setAttribute('autocomplete', 'new-email');
        } else if (this.name === "password") {
          this.setAttribute('autocomplete', 'new-password');
        }
      }, 100);
    });
  });

  // Wait for autofill to apply
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