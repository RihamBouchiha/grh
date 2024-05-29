document.addEventListener("DOMContentLoaded", function() {
    const loginLink = document.getElementById("loginLink");
    if (loginLink) {
        loginLink.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "indexSeconnecter.html";
        });
    }
});

$(document).ready(function() {
    // Capturer l'événement de soumission du formulaire d'inscription
    $('#sign-up').submit(function(event) {
        // Empêcher le comportement par défaut du formulaire
        event.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = {
            lastname: $('#lastname').val(),
            firstname: $('#firstname').val(),
            gender: $('#gender').val(),
            birthdate: $('#birthdate').val(),
            nationality: $('#nationality').val(),
            phone_number: $('#phone_number').val(),
            address: $('#address').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            confirm_password: $('#confirm_password').val()
        };
        
        // Envoyer les données au serveur pour inscription
        $.ajax({
            type: 'POST',
            url: 'http://localhost:2003/inscription', // Modifier l'URL si nécessaire
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                // Gérer la réponse du serveur
                console.log(response);
                // Rediriger l'utilisateur vers une page de confirmation, par exemple
                window.location.href = "inscription_reussie.html";
            },
            error: function(xhr, status, error) {
                // Gérer les erreurs de requête
                console.error(error);
                alert('Une erreur est survenue lors de l\'inscription');
            }
        });
    });
});

