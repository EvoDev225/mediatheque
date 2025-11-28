const mongoose = require("mongoose")
const schemaUtilisateur = new mongoose.Schema({
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    email:{type:String,required:true},
    motdepasse:{type:String,required:true},
    contact:{type:String,required:true},
    niveau:{type:Number,required:true},
    estVerifier:{type:Boolean,default:false},
    service: { 
        type: String,   
        required: true  // Ajustez selon vos besoins
    },
    verificationJeton : String,
    dateVerificationJeton:Date,
    reinitialisationMotdepasse:String,
    dateReinitialisationMotdepasse:Date
},{timestamps:true})

const Utilisateur = mongoose.model("utilisateur",schemaUtilisateur)
module.exports = Utilisateur