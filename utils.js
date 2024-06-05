const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/connexion');
const Employee = require('./models/employee');
const Condidat = require('./models/condidat');

const app = express();
const port = 3017;

app.use(cors());
app.use(express.json());



const mongoUri = "mongodb+srv://rihambouchiha:Xaagi1260@riham.3lo32iv.mongodb.net/grh";

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connecté à la base de données");
    })
    .catch((err) => {
        console.error("Erreur de connexion à la base de données MongoDB :", err);
    });

// Connexion
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

// GET employés
app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error('Erreur lors de la récupération des employés :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des employés' });
    }
});

//post employé 
app.post('/employees/add', async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json({ message: 'Employé ajouté avec succès', employee: newEmployee });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'employé :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout de l\'employé' });
    }
});


//delete employé
app.delete('/employees/delete/:id', async (req, res) => {
    const employeeId = req.params.id;
    try {
        const deletedEmployee = await Employee.findOneAndDelete({ id: employeeId });
        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employé non trouvé' });
        }
        res.status(200).json({ message: 'Employé supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'employé :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'employé' });
    }
});



// GET candidats
app.get('/condidats', async (req, res) => {
    try {
        const condidats = await Condidat.find();
        res.status(200).json(condidats);
    } catch (error) {
        console.error('Erreur lors de la récupération des candidats :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des candidats' });
    }
});

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
