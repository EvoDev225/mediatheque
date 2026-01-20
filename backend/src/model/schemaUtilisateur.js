const mongoose = require("mongoose")
const schemaUtilisateur = new mongoose.Schema({
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    email:{type:String,required:true},
    motdepasse:{type:String,required:true},
    contact:{type:String,required:true},
    type:{
        type:String,
        enum:["administrateur","employé"],
        default:"employé",
        required:true
    },
    niveau:{type:Number,min:1,max:5,default:1,required:true},
    service: { 
        type: String,   
        required: true  // Ajustez selon vos besoins
    },
    actif: { type: Boolean, default: true },
    reinitialisationMotdepasse:String,
    dateReinitialisationMotdepasse:Date
},{timestamps:true})

const Utilisateur = mongoose.model("utilisateur",schemaUtilisateur)
module.exports = Utilisateur