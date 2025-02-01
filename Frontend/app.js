// Class for handling user registration
class User {
    constructor(name, email, password, dob, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.dob = dob;
        this.id = id;
    }

    displayInfo() {
        console.log(`Name: ${this.name}, Email: ${this.email}`);
    }
}

// Sign up function
function signup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const dob = document.getElementById('dob').value;
    const id = document.getElementById('id').value;

    if (name && email && password && dob && id) {
        const newUser = new User(name, email, password, dob, id);
        newUser.displayInfo();
        alert('Successfully signed up!');
        window.location.href = 'index.html'; // Redirect to homepage after signup
    } else {
        alert('Please fill in all fields');
    }
}

// Login function
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email && password) {
        alert('Logged in successfully');
        window.location.href = 'index.html'; // Redirect to homepage after login
    } else {
        alert('Please enter email and password');
    }
}

// Initialize locations array from localStorage
let locations = JSON.parse(localStorage.getItem("locations")) || [];

// Function to display locations in the "Dirty Places Needing Help" section
function displayLocations() {
    const placesContainer = document.querySelector("#locations .places");
    placesContainer.innerHTML = ""; // Clear existing content

    if (locations.length === 0) {
        placesContainer.innerHTML = "<p>No locations added yet. Be the first to add one!</p>";
    } else {
        locations.forEach((location, index) => {
            const placeDiv = document.createElement("div");
            placeDiv.classList.add("place");

            placeDiv.innerHTML = `
                <img src="${location.img || 'default.jpg'}" alt="${location.name}">
                <h3>${location.name}</h3>
                <p>Requires ${location.volunteers} volunteers</p>
                <button class="volunteer-btn" data-index="${index}">Volunteer</button>
            `;
            placesContainer.appendChild(placeDiv);
        });
    }
}

// Handle volunteering button clicks
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("volunteer-btn")) {
        addVolunteer(2);
    }
});

// Retrieve stored statistics from localStorage
let totalVolunteers = parseInt(localStorage.getItem('totalVolunteers')) || 0;
let totalHours = parseInt(localStorage.getItem('totalHours')) || 0;

// Update statistics in the profile page
function updateStats() {
    const totalVolunteersElement = document.getElementById('totalVolunteers');
    const totalHoursElement = document.getElementById('totalHours');

    if (totalVolunteersElement) {
        totalVolunteersElement.textContent = totalVolunteers;
    }
    if (totalHoursElement) {
        totalHoursElement.textContent = totalHours;
    }
}

// Function to add a volunteer
function addVolunteer(hoursPerActivity = 2) {
    totalVolunteers++;
    totalHours += hoursPerActivity;

    // Update stats on UI
    updateStats();

    // Store new values in localStorage
    localStorage.setItem('totalVolunteers', totalVolunteers);
    localStorage.setItem('totalHours', totalHours);
}

// Display stored locations on page load
window.addEventListener("DOMContentLoaded", () => {
    displayLocations();
    updateStats();
});

// Handle form submission for adding a new location
const form = document.getElementById("addLocationForm");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page refresh

        // Get form data
        const placeName = document.getElementById('placeName').value;
        const city = document.getElementById('city').value;
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;
        const contact = document.getElementById('contact').value;
        const volunteersNeeded = document.getElementById('volunteersNeeded').value;
        const hoursRequired = document.getElementById('hoursRequired').value;

        // Validate required fields
        if (!placeName || !city || !location || !volunteersNeeded || !hoursRequired) {
            alert("Please fill in all required fields.");
            return;
        }

        // Create location data object
        const locationData = {
            placeName,
            city,
            location,
            description,
            contact,
            volunteersNeeded,
            hoursRequired
        };

        // Save location data
        locations.push(locationData);
        localStorage.setItem("locations", JSON.stringify(locations));

        // Show success message
        alert("Location added successfully!");

        // Reset the form
        form.reset();

        // Refresh displayed locations
        displayLocations();
    });
}

// Filter and display locations
document.addEventListener("DOMContentLoaded", function () {
    const locationsList = document.getElementById("locationsList");
    const cityFilter = document.getElementById("cityFilter");
    const searchFilter = document.getElementById("searchFilter");

    // Function to render locations
    function renderLocations(filteredLocations) {
        locationsList.innerHTML = ""; // Clear the previous list

        if (filteredLocations.length === 0) {
            locationsList.innerHTML = "<p>No locations found.</p>";
            return;
        }

        filteredLocations.forEach((location) => {
            const locationElement = document.createElement("div");
            locationElement.classList.add("location");

            locationElement.innerHTML = `
                <h3>${location.placeName}</h3>
                <p>City: ${location.city}</p>
                <p>Location: ${location.location}</p>
                <p>Description: ${location.description}</p>
                <p>Contact: ${location.contact}</p>
                <p>Volunteers Needed: ${location.volunteersNeeded}</p>
                <p>Hours Required: ${location.hoursRequired}</p>
            `;

            locationsList.appendChild(locationElement);
        });
    }

    // Filter function
    function filterLocations() {
        let filteredLocations = [...locations];

        // Filter by city
        const selectedCity = cityFilter.value;
        if (selectedCity) {
            filteredLocations = filteredLocations.filter(location => location.city === selectedCity);
        }

        // Filter by search input
        const searchTerm = searchFilter.value.toLowerCase();
        if (searchTerm) {
            filteredLocations = filteredLocations.filter(location =>
                location.placeName.toLowerCase().includes(searchTerm) ||
                location.city.toLowerCase().includes(searchTerm)
            );
        }

        // Display the filtered locations
        renderLocations(filteredLocations);
    }

    // Attach event listeners to filters
    cityFilter?.addEventListener("change", filterLocations);
    searchFilter?.addEventListener("input", filterLocations);

    // Initial render
    renderLocations(locations);
});
