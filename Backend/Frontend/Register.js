// Handle form submission
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;

    // Validate that all fields are filled
    if (!username || !email || !password || !dob) {
        alert("All fields are required!");
        return;
    }

    // Send the data to the backend for registration
    fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, dob }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'User registered!') {
            // If registration is successful, redirect to login page
            alert("Account created successfully! Please log in.");
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            alert(data.message || 'Error creating account');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error with registration process');
    });
});
