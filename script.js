// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    // Event listener for form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm();
    });

    // Event listener for input changes
    form.addEventListener('input', function (event) {
        if (event.target.id) {
            validateField(event.target.id);
        }
    });
});

// Handle form submit
function handleFormSubmit() {
    const valid = validateForm();
    return valid; // If the form is valid, it will submit; otherwise, it will prevent submission.
}

// Validate the entire form
function validateForm() {
    const fields = ['fullName', 'email', 'phoneNumber', 'password', 'confirmPassword'];
    let valid = true;

    fields.forEach(field => {
        if (!validateField(field)) {
            valid = false;
        }
    });

    if (valid) {
        alert('Form submitted successfully!');
    }

    return valid;
}

// Validate individual field based on its id
function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    let valid = false;

    switch (fieldId) {
        case 'fullName':
            valid = validateName(field);
            break;
        case 'email':
            valid = validateEmail(field);
            break;
        case 'phoneNumber':
            valid = validatePhone(field);
            break;
        case 'password':
            valid = validatePassword(field);
            break;
        case 'confirmPassword':
            valid = validateConfirmPassword(field);
            break;
    }

    if (valid) {
        field.classList.remove('is-invalid');
    } else {
        field.classList.add('is-invalid');
    }

    return valid;
}

function validateName(field) {
    const name = field.value.trim();
    const error = document.getElementById('nameError');
    if (name.length >= 5) {
        error.textContent = '';
        return true;
    } else {
        error.textContent = 'Name must be at least 5 characters long';
        return false;
    }
}

function validateEmail(field) {
    const email = field.value.trim();
    const error = document.getElementById('emailError');
    if (email.includes('@')) {
        error.textContent = '';
        return true;
    } else {
        error.textContent = 'Enter a valid email address (must contain \'@\')';
        return false;
    }
}

function validatePhone(field) {
    const phone = field.value.trim();
    const error = document.getElementById('phoneError');
    if (phone.length === 10 && phone !== '123456789' && /^[0-9]{10}$/.test(phone)) {
        error.textContent = '';
        return true;
    } else {
        error.textContent = 'Enter a valid 10-digit phone number and must not be \'123456789\'';
        return false;
    }
}

function validatePassword(field) {
    const password = field.value.trim();
    const fullName = document.getElementById('fullName').value.trim();
    const error = document.getElementById('passwordError');
    if (password.length >= 8 && password !== 'password' && password !== fullName) {
        error.textContent = '';
        return true;
    } else {
        error.textContent = 'Password must be at least 8 characters long and not "password" or your name';
        return false;
    }
}

function validateConfirmPassword(field) {
    const confirmPassword = field.value.trim();
    const password = document.getElementById('password').value.trim();
    const error = document.getElementById('confirmPasswordError');
    if (confirmPassword === password) {
        error.textContent = '';
        return true;
    } else {
        error.textContent = 'Passwords do not match';
        return false;
    }
}
