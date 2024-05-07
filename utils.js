const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = 3002
const app = express()
module.exports = {
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
    ]
  }
  
  mongoose.connect("mongodb+srv://rihambouchiha:Xaagi1260@riham.3lo32iv.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.error("erreur de connexion à la base de données MongoDB :", err);
  });





const db = mongoose.connection;
db.on('error',console.error.bind(console,'erreur de connexion à mongodb'));
db.once('open',function(){
    console.log('connecté à la base de donnée de mongodb');
});

const seconnecterSchema = new mongoose.Schema({
    adresse_mail:String,
    mot_de_passe:String   
});

const Seconnecter = mongoose.model('Seconnecter',seconnecterSchema);

app.post('/seconnecter1',(req,res)=>{
    const{adresse_mail,mot_de_passe} = req.body;
    const newSeconnecter = new Seconnecter({
        adresse_mail:adresse_mail,
        mot_de_passe:mot_de_passe
    });

newSeconnecter.save((err,savedSeconnecter)=>{
    if(err){
        console.error("erreur pour enregistrer les données dans la base de donnée")
        res.status(500).send('erreur pour enregistrer')
    }
    else{
        console.log("enregistré avec succès")
        res.status(201).json(savedSeconnecter);
    }
});
});











app.listen(port,()=>{
    console.log("le serveur est en démarrage!!${port}");
})