document.addEventListener("DOMContentLoaded", function() {
    // Redirection to indexSeconnecter.html on link click
    document.querySelectorAll("a[href='indexSeconnecter.html']").forEach(function(element) {
        element.addEventListener("click", function(event) {
            event.preventDefault(); 
            window.location.href = "indexSeconnecter.html"; 
        });
    });

    // Login form submission
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const data = {
            email: email,
            password: password
        };

        console.log('Envoi des données de connexion :', data);

        fetch('http://localhost:3003/Seconnecter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            window.location.href = '/dashboardGrh/indexDashboard.html';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});