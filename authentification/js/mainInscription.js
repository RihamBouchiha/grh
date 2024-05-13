 
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/seconnecter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ adresse_mail: email, mot_de_passe: password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Données enregistrées avec succès :', data);
            } else {
                console.error('Erreur lors de l\'enregistrement des données');
            }
        } catch (error) {
            console.error('Erreur lors de la requête :', error);
        }
    });
});
