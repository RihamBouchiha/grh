const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/connexion');
const Employee = require('./models/employee'); 

const app = express();
const port = 3012;

app.use(cors());
app.use(express.json()); // Ajout de express.json() pour parser les données JSON

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
        const user = await User.findOne({ email });

        if (user) {
            res.redirect('./dashboardGrh/indexDashboard');
        } else {
            res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'utilisateur :', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});

app.post('/employees', async (req, res) => {
    const employeeData = req.body;

    try {
        const newEmployee = new Employee(employeeData);
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'employé :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout de l\'employé' });
    }
});

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
