const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/connexion'); 

const app = express();
const port = 2002;

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
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès', user });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
