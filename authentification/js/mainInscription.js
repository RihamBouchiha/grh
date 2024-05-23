document.addEventListener("DOMContentLoaded", function() {
    // Handler pour le lien de connexion
    const loginLink = document.getElementById("loginLink");
    if (loginLink) {
        loginLink.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "indexSeconnecter.html";
        });
    }

    // Handler pour le formulaire d'inscription
    const form = document.getElementById("sign-up");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const lastname = document.getElementById("lastname").value;
            const firstname = document.getElementById("firstname").value;
            const gender = document.getElementById("gender").value;
            const birthdate = document.getElementById("birthdate").value;
            const nationality = document.getElementById("nationality").value;
            const phone_number = document.getElementById("phone_number").value;
            const address = document.getElementById("address").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirm_password = document.getElementById("confirm_password").value;

            const data = {
                lastname,
                firstname,
                gender,
                birthdate,
                nationality,
                phone_number,
                address,
                email,
                password,
                confirm_password
            };

            fetch('http://localhost:3002/signup', {
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
                window.location.href = "indexSeconnecter.html";
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }
});
