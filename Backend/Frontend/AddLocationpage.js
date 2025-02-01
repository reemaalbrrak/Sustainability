const form = document.getElementById("addLocationForm");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const placeName = document.getElementById("placeName").value;
    const city = document.getElementById("city").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;
    const contact = document.getElementById("contact").value;
    const volunteersNeeded = document.getElementById("volunteersNeeded").value;
    const hoursRequired = document.getElementById("hoursRequired").value;

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

    // Show success message and reset the form
    alert("Location added successfully!");
    form.reset();

    // Redirect to Locations page
    window.location.href = "locationpage.html";
});