const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Employee = require('./employeeModel'); // Assurez-vous que votre modèle Employee est correctement importé

const app = express();
const port = 3004;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://rihambouchiha:Xaagi1260@riham.3lo32iv.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.error("Erreur de connexion à la base de données MongoDB :", err);
    });

app.post('/addEmployee', async (req, res) => {
    try {
        const employeeData = req.body;
        const newEmployee = new Employee(employeeData);
        
        await newEmployee.save();

        res.status(201).send('Employé ajouté avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'employé :', error);
        res.status(500).send('Erreur lors de l\'ajout de l\'employé');
    }
});

app.listen(port, () => {
    console.log(`Le serveur est en démarrage sur le port ${port}`);
});
