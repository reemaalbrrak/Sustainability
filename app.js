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
// Dummy locations array to hold the added locations
let locations = [
    { name: "City Park", volunteers: 10, img: "place1.jpg" },
    { name: "Main Street", volunteers: 5, img: "place2.jpg" },
];

// Function to display locations in the "Dirty Places Needing Help" section
function displayLocations() {
    const placesContainer = document.querySelector("#locations .places");
    placesContainer.innerHTML = ""; // Clear existing content

    locations.forEach((location) => {
        const placeDiv = document.createElement("div");
        placeDiv.classList.add("place");

        placeDiv.innerHTML = `
            <img src="${location.img}" alt="${location.name}">
            <h3>${location.name}</h3>
            <p>Requires ${location.volunteers} volunteers</p>
            <button class="volunteer-btn">Volunteer</button>
        `;
        placesContainer.appendChild(placeDiv);
    });
}

// Initialize locations array from localStorage or as empty
let locations = JSON.parse(localStorage.getItem("locations")) || [];

// Function to display locations in the "Dirty Places Needing Help" section
function displayLocations() {
    const placesContainer = document.querySelector("#locations .places");
    placesContainer.innerHTML = ""; // Clear existing content

    if (locations.length === 0) {
        placesContainer.innerHTML = "<p>No locations added yet. Be the first to add one!</p>";
    } else {
        locations.forEach((location) => {
            const placeDiv = document.createElement("div");
            placeDiv.classList.add("place");

            placeDiv.innerHTML = `
                <img src="${location.img || 'default.jpg'}" alt="${location.name}">
                <h3>${location.name}</h3>
                <p>Requires ${location.volunteers} volunteers</p>
                <button class="volunteer-btn">Volunteer</button>
            `;
            placesContainer.appendChild(placeDiv);
        });
    }
}

// Function to display locations in the "Dirty Places Needing Help" section
function displayLocations() {
    const placesContainer = document.querySelector("#locations .places");
    const locations = JSON.parse(localStorage.getItem("locations")) || []; // Load from localStorage

    placesContainer.innerHTML = ""; // Clear existing content

    if (locations.length === 0) {
        placesContainer.innerHTML = "<p>No locations added yet. Be the first to add one!</p>";
    } else {
        locations.forEach((location) => {
            const placeDiv = document.createElement("div");
            placeDiv.classList.add("place");

            placeDiv.innerHTML = `
                <img src="${location.img || 'default.jpg'}" alt="${location.name}">
                <h3>${location.name}</h3>
                <p>Requires ${location.volunteers} volunteers</p>
                <button class="volunteer-btn">Volunteer</button>
            `;
            placesContainer.appendChild(placeDiv);
        });
    }
}

// Initial render
displayLocations();
// استرجاع البيانات المحفوظة في localStorage أو تعيين القيم الافتراضية
let totalVolunteers = parseInt(localStorage.getItem('totalVolunteers')) || 0;
let totalHours = parseInt(localStorage.getItem('totalHours')) || 0;

// تعريف العناصر في واجهة البروفايل
const totalVolunteersElement = document.getElementById('totalVolunteers');
const totalHoursElement = document.getElementById('totalHours');

// تعريف أزرار التطوع في الهوم بيج
const volunteerButtons = document.querySelectorAll('.volunteer-btn');

// تحديث عدد التطوعات والساعات عند التطوع
function addVolunteer(hoursPerActivity = 2) {
    totalVolunteers++;
    totalHours += hoursPerActivity;

    // تحديث الواجهة
    updateStats();

    // تخزين القيم الجديدة في localStorage
    localStorage.setItem('totalVolunteers', totalVolunteers);
    localStorage.setItem('totalHours', totalHours);
}

// تحديث الإحصائيات في صفحة البروفايل
function updateStats() {
    if (totalVolunteersElement) {
        totalVolunteersElement.textContent = totalVolunteers;
    }
    if (totalHoursElement) {
        totalHoursElement.textContent = totalHours;
    }
}

// ربط أزرار التطوع في صفحة الهوم بيج بوظيفة التطوع
volunteerButtons.forEach((button) => {
    button.addEventListener('click', () => {
        addVolunteer(2); // افتراض أن كل تطوع يضيف ساعتين
    });
});

// تحديث القيم في واجهة البروفايل عند تحميل الصفحة
updateStats();
// Display the saved locations
window.addEventListener("DOMContentLoaded", () => {
    const locations = JSON.parse(localStorage.getItem("locations")) || [];
    const locationsList = document.getElementById("locationsList");

    locationsList.innerHTML = ""; // Clear previous entries

    locations.forEach((location) => {
        const locationItem = document.createElement("div");
        locationItem.classList.add("location-item");

        locationItem.innerHTML = `
            <h3>${location.placeName}</h3>
            <p><strong>City:</strong> ${location.city}</p>
            <p><strong>Location:</strong> ${location.location}</p>
            <p><strong>Description:</strong> ${location.description}</p>
            <p><strong>Contact:</strong> ${location.contact}</p>
            <p><strong>Volunteers Needed:</strong> ${location.volunteersNeeded}</p>
            <p><strong>Hours Required:</strong> ${location.hoursRequired}</p>
        `;

        locationsList.appendChild(locationItem);
    });
});
// Handle form submission
const form = document.getElementById("addLocationForm");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

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

    // Get existing locations or create a new array
    const locations = JSON.parse(localStorage.getItem("locations")) || [];
    locations.push(locationData);
    localStorage.setItem("locations", JSON.stringify(locations)); // Save to localStorage

    // Show success message
    alert("Location added successfully!");

    // Reset the form
    form.reset();

    // Redirect to Locations page
    window.location.href = "locations.html";
});
document.addEventListener("DOMContentLoaded", function() {
    const locationsList = document.getElementById("locationsList");
    const cityFilter = document.getElementById("cityFilter");
    const searchFilter = document.getElementById("searchFilter");

    // Fetch locations from localStorage
    const locations = JSON.parse(localStorage.getItem("locations")) || [];

    // Function to render locations
    function renderLocations(locations) {
        locationsList.innerHTML = ""; // Clear the previous list

        locations.forEach(location => {
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

    // Function to filter locations based on search and city filter
    function filterLocations() {
        let filteredLocations = [...locations];

        // Filter by city
        const selectedCity = cityFilter.value;
        if (selectedCity) {
            filteredLocations = filteredLocations.filter(location => location.city === selectedCity);
        }

        // Filter by search name
        const searchText = searchFilter.value.toLowerCase();
        if (searchText) {
            filteredLocations = filteredLocations.filter(location => location.placeName.toLowerCase().includes(searchText));
        }

        renderLocations(filteredLocations);
    }

    // Function to sort locations by hours
    function sortLocationsByHours() {
        const sortedLocations = [...locations].sort((a, b) => a.hoursRequired - b.hoursRequired);
        renderLocations(sortedLocations);
    }

    // Event listeners for filters
    cityFilter.addEventListener("change", filterLocations);
    searchFilter.addEventListener("input", filterLocations);

    // Initial render
    renderLocations(locations);
});
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
// Simulating a database (for demo purposes)
let usersDatabase = [
    { email: "user@example.com", password: "password123", name: "John Doe", dob: "1990-01-01", id: "12345" }
];

// Show signup form
function showSignupForm() {
    // Make the signup form visible
    document.getElementById("signup-form").style.display = "block";
    // Hide the login form
    document.getElementById("login-form").style.display = "none";
}

// Show login form
function showLoginForm() {
    // Make the login form visible
    document.getElementById("signup-form").style.display = "none";
    // Hide the signup form
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
