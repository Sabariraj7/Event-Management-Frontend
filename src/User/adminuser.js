document.addEventListener('DOMContentLoaded', setupUserForm);

function setupUserForm() {
    const userForm = document.getElementById('userForm');
    const usernameInput = document.getElementById('userName');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const roleInput = document.getElementById('role');

    userForm.addEventListener('submit', handleFormSubmit);
    usernameInput.addEventListener('input', debounceCheckUsername);
    phoneInput.addEventListener('input', validatePhoneInput);
    passwordInput.addEventListener('input', validatePasswordInput);
}

function handleFormSubmit(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('userName');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const roleInput = document.getElementById('role');

    const userName = usernameInput.value.trim();
    const password = passwordInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value.trim();
    const role = roleInput.value;

    if (!validatePhone(phone) || !validatePassword(password)) {
        return;
    }

    const userData = {
        userName: userName,
        password: password,
        email: email,
        phone: phone,
        role: role
    };

    fetch('http://localhost:9000/eventmicroservice/users/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error creating user');
        }
        return response.json();
    })
    .then(data => {
        console.log('User created:', data);
        alert('User created successfully!');
        window.location.href = 'login.html'; // Redirect to login.html
    })
    .catch(error => {
        console.error('Error creating user:', error);
        alert('Error creating user');
    });
}

function debounceCheckUsername() {
    const usernameInput = document.getElementById('userName');
    const userName = usernameInput.value.trim();

    clearTimeout(window.debounceTimer);
    window.debounceTimer = setTimeout(() => {
        if (userName.length > 0) {
            checkUsernameExists(userName);
        } else {
            clearUsernameError();
        }
    }, 300); // Adjust debounce delay as needed
}

function checkUsernameExists(userName) {
    fetch(`http://localhost:9000/eventmicroservice/users/username/${userName}`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Username does not exist.');
            }
        })
        .then(user => {
            showUsernameError('Username already exists. Please choose a different username.');
        })
        .catch(error => {
            clearUsernameError();
        });
}

function validatePhoneInput() {
    const phoneInput = document.getElementById('phone');
    const phone = phoneInput.value.trim();

    if (phone.length === 10) {
        clearPhoneError();
    } else {
        showPhoneError('Phone number must be exactly 10 digits.');
    }
}

function validatePasswordInput() {
    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordPattern.test(password)) {
        clearPasswordError();
    } else {
        showPasswordError('Password must be at least 8 characters long, contain letters, numbers, and at least one special character.');
    }
}

function validatePhone(phone) {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
}

function validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
}

function clearUsernameError() {
    const usernameError = document.getElementById('usernameError');
    const usernameInput = document.getElementById('userName');
    usernameError.textContent = '';
    usernameInput.style.borderColor = '';
}

function showUsernameError(message) {
    const usernameError = document.getElementById('usernameError');
    const usernameInput = document.getElementById('userName');
    usernameError.textContent = message;
    usernameInput.style.borderColor = 'red';
}

function clearPhoneError() {
    const phoneError = document.getElementById('phoneError');
    const phoneInput = document.getElementById('phone');
    phoneError.textContent = '';
    phoneInput.style.borderColor = '';
}

function showPhoneError(message) {
    const phoneError = document.getElementById('phoneError');
    const phoneInput = document.getElementById('phone');
    phoneError.textContent = message;
    phoneInput.style.borderColor = 'red';
}

function clearPasswordError() {
    const passwordError = document.getElementById('passwordError');
    const passwordInput = document.getElementById('password');
    passwordError.textContent = '';
    passwordInput.style.borderColor = '';
}

function showPasswordError(message) {
    const passwordError = document.getElementById('passwordError');
    const passwordInput = document.getElementById('password');
    passwordError.textContent = message;
    passwordInput.style.borderColor = 'red';
}
