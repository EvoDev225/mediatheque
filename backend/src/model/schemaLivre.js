const mongoose = require("mongoose")
const schemaLivre = new mongoose.Schema({
    code:{type:Number,required:true},
    img:{type:String},
    numero:{type:Number,required:true},
    titre:{type:String,required:true},
    auteur:{type:String,required:true},
    lieuEdition:{type:String,required:true},
    dateEdition:{type:Date,required:true},
    origine:{type:String,required:true},
    quantite:{type:String,required:true},
    dateEnregistrement:{type:Date,required:true},
    status:{type:String,required:true},
    categorie:{type:String,required:true}
},{timestamps:true})

const Livre = mongoose.model("livre",schemaLivre)
module.exports = Livre