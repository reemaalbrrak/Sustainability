// auth.js

// Simulating a database (for demo purposes)
let usersDatabase = [
    { email: "user@example.com", password: "password123", name: "John Doe", dob: "1990-01-01", id: "12345" }
];

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

// Signup function
function signup() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const dob = document.getElementById("dob").value;
    const id = document.getElementById("id").value;

    // Check if email already exists
    let userExists = usersDatabase.some(user => user.email === email);

    if (userExists) {
        alert("This email is already registered. Please log in.");
        showLoginForm();
    } else {
        // Create a new user
        usersDatabase.push({ email, password, name, dob, id });
        alert("Account created successfully! Please log in.");
        showLoginForm();
    }
}

// Login function
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Find user in the database
    const user = usersDatabase.find(user => user.email === email && user.password === password);

    if (user) {
        alert("Login successful! Welcome, " + user.name);
        // Redirect to home page and pass user's name in URL
        window.location.href = "homepage.html?user=" + user.name;
    } else {
        alert("Invalid email or password. Please try again.");
    }
}
