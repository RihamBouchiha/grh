        const express = require('express');
        const mongoose = require('mongoose');
        const cors = require('cors');
        const User = require('./models/connexion');
        const Employee = require('./models/employee');
        const Condidat = require('./models/condidat');
        const ToDoModel = require('./models/todo');
        const app = express();
        const port = 3018;

        app.use(cors());
        app.use(express.json());



        const mongoUri = "mongodb+srv://rihambouchiha:Xaagi1260@riham.3lo32iv.mongodb.net/grh";

        mongoose.connect(mongoUri)
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


        //update employé
        app.put('/employees/update/:id', async (req, res) => {
            const employeeId = req.params.id;
            const updatedEmployeeData = req.body;

            try {
                const updatedEmployee = await Employee.findOneAndUpdate({ id: employeeId }, updatedEmployeeData, { new: true });

                if (!updatedEmployee) {
                    return res.status(404).json({ error: 'Employé non trouvé' });
                }

                res.status(200).json({ message: 'Données de l\'employé mises à jour avec succès', employee: updatedEmployee });
            } catch (error) {
                console.error('Erreur lors de la mise à jour des données de l\'employé :', error);
                res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour des données de l\'employé' });
            }
        });

        // Route pour récupérer le nombre total d'employés
        app.get('/employees/count', async (req, res) => {
            try {
                const numberOfEmployees = await Employee.countDocuments();
                res.status(200).json({ count: numberOfEmployees });
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre d\'employés :', error);
                res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du nombre d\'employés' });
            }
        });


        // GET candidats
        // Route pour récupérer le nombre d'employés
        // GET nombre total de condidats
        app.get('/condidats/count', async (req, res) => {
            try {
                const numberOfCondidats = await Condidat.countDocuments();
                res.status(200).json({ count: numberOfCondidats });
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de condidats :', error);
                res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du nombre de condidats' });
            }
        });
        // get condidats
        // GET nombre total de condidats
        app.get('/condidats/count', async (req, res) => {
            try {
                const numberOfCondidats = await Condidat.countDocuments();
                res.status(200).json({ count: numberOfCondidats });
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de condidats :', error);
                res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du nombre de condidats' });
            }
        });

        // Route pour ajouter une tâche 
        // Route pour ajouter une tâche 
app.post('/todos/add', async (req, res) => {
    try {
      const { task } = req.body;
      console.log('Received task:', task);

      if (!task) {
        return res.status(400).json({ error: 'Task is required' });
      }
      const newTask = new ToDoModel({ task, completed: false }); // Set completed to false by default
      await newTask.save();
      res.status(201).json({ message: 'Tâche ajoutée avec succès' });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout de la tâche' });
    }
});

        
        

        app.get('/todos', async (req, res) => {
            try {
                const todos = await ToDoModel.find();
                res.status(200).json(todos);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                res.status(500).json({ error: 'An error occurred while fetching tasks' });
            }
        });


        app.get('/todos/completed/count', async (req, res) => {
            try {
              const count = await ToDoModel.countDocuments({ completed: true });
              res.status(200).json({ count });
            } catch (error) {
              console.error('Error fetching count of completed tasks:', error);
              res.status(500).json({ error: 'An error occurred while fetching count of completed tasks' });
            }
          });
          
        


        

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
