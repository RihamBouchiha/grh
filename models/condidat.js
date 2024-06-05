const mongoose = require('mongoose');

const condidatSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true },
    statutSocial: { type: String, required: true },
    positionCiblee: { type: String, required: true },
    cv: { type: String, required: true },
});

module.exports = mongoose.model('Condidat', condidatSchema);
