const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://rihambouchiha:Xaagi1260@riham.3lo32iv.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.error("Erreur de connexion à la base de données MongoDB :", err);
    });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB'));
db.once('open', function() {
    console.log('Connecté à la base de données de MongoDB');
});

const seconnecterSchema = new mongoose.Schema({
    email: String,
    password: String
});

const Seconnecter = mongoose.model('Seconnecter', seconnecterSchema);

app.post('/seconnecter1', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);  // Hachage du mot de passe
        const newSeconnecter = new Seconnecter({
            email: email,
            password: hashedPassword
        });

        const savedSeconnecter = await newSeconnecter.save();
        console.log("Enregistré avec succès");
        res.status(201).json(savedSeconnecter);
    } catch (err) {
        console.error("Erreur pour enregistrer les données dans la base de données", err);
        res.status(500).send('Erreur pour enregistrer');
    }
});

app.listen(port, () => {
    console.log(`Le serveur est en démarrage sur le port ${port}`);
});
