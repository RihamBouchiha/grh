document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('').value;
        const password = document.getElementById('password').value;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    console.log('Données enregistrées avec succès :', data);
                } else {
                    console.error('Erreur lors de l\'enregistrement des données');
                }
            }
        };

        xhr.open('POST', '/seconnecter1');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ adresse_mail: email, mot_de_passe: password }));
    });
});
