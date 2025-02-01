     // Load user data from LocalStorage
        const fullName = localStorage.getItem('fullName');
        const email = localStorage.getItem('email');
        const phone = localStorage.getItem('phone');
        const nationalId = localStorage.getItem('nationalId');

        // Display user data on profile
        document.getElementById('profileName').textContent = fullName || 'Unknown User';
        document.getElementById('profileEmail').textContent = email || 'Not provided';
        document.getElementById('profilePhone').textContent = phone || 'Not provided';
        document.getElementById('profileNationalId').textContent = nationalId || 'Not provided';
