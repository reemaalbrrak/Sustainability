// Show signup form
function showSignupForm() {
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
}

// Show login form
function showLoginForm() {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

// Signup function (sending data to backend)
async function signup() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const dob = document.getElementById("dob").value;
    const id = document.getElementById("id").value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, dob, id }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Account created successfully! Please log in.');
            showLoginForm();
        } else {
            alert(data.message || 'Error creating account');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error with signup process');
    }
}

// Login function (sending data to backend)
async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login successful! Welcome, " + data.username);
            // Store the token in localStorage or sessionStorage
            localStorage.setItem('token', data.token);
            // Redirect to homepage or dashboard
            window.location.href = "homepage.html?user=" + data.username;
        } else {
            alert(data.message || 'Invalid email or password');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error with login process');
    }
}
