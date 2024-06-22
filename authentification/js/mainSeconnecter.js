document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const data = { email, password };

        console.log('Sending login data:', data);

        fetch('http://localhost:3018/Seconnecter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            window.location.href = '/dashboardGrh/indexDashboard.html';
        })
        .catch((error) => {
            console.error('Error:', error.message); // Log the error message
        });
    });
});
