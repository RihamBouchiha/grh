const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/connexion'); 

const app = express();
const port = 3010;

app.use(cors());
app.use(bodyParser.json());

const mongoUri = "mongodb+srv://rihambouchiha:Xaagi1260@riham.3lo32iv.mongodb.net/grh"; 

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connecté à la base de données");
    })
    .catch((err) => {
        console.error("Erreur de connexion à la base de données MongoDB :", err);
    });

    app.post('/Seconnecter', async (req, res) => {
        const { email, password } = req.body;
    
        try {
            // Recherche de l'utilisateur dans la base de données par email
            const user = await User.findOne({ email });
    
            if (user) {
                // Si l'utilisateur existe, tu peux rediriger vers une page spécifique
                res.redirect('./dashboardGrh/indexDashboard');
            } else {
                // Si l'utilisateur n'existe pas, affiche un message d'erreur
                res.status(401).json({ error: 'Email ou mot de passe incorrect' });
            }
        } catch (error) {
            console.error('Erreur lors de la connexion de l\'utilisateur :', error);
            res.status(500).json({ error: 'Une erreur est survenue' });
        }
    });
    
    

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});