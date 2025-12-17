const mongoose = require("mongoose")
const schemaDemande = new mongoose.Schema({
    nom:{type:String,required:true},
    email:{type:String,required:true},
    titre:{type:String,required:true},
    message:{type:String,required:true}
},{timestamps:true})

const Demande = mongoose.model("demande",schemaDemande)
module.exports = Demande