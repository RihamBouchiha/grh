const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  genre: { type: String, required: true },
  dateNaissance: { type: Date, required: true },
  telephone: { type: String, required: true },
  adresseEmail: { type: String, required: true }, 
  poste: { type: String, required: true }, 
  statutEmploi: { type: String, required: true }, 
  salaire: { type: String, required: true },
  cnss: { type: String, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
