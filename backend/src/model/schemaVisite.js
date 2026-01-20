const mongoose = require("mongoose")
const schemaVisite = new mongoose.Schema({
    type:{type:String,required:true},
    date:{type:String,required:true,
    match: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    },
    heure: { 
        type: String, 
        required: true,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // Valide format HH:MM
    },
    nomUtilisateur:{
        type:String,
        required:true
    },
    nomEspace:{
        type:String,
        required:true
    }
},{timestamps:true})

const Visite = mongoose.model("visite",schemaVisite)
module.exports = Visite