const mongoose = require("mongoose")
const schemaLivre = new mongoose.Schema({
    code:{type:Number,required:true},
    img:{type:String},
    numero:{type:Number,required:true},
    titre:{type:String,required:true},
    auteur:{type:String,required:true},
    lieuEdition:{type:String,required:true},
    dateEdition:{type:String,required:true,
        match: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    },
    origine:{type:String,required:true},
    quantite:{type:Number,required:true},
    dateEnregistrement:{type:String,required:true,
        match: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    },
    status:{type:String,required:true},
    categorie:{type:String,required:true},
    type:{type:String,required:true}
},{timestamps:true})

const Livre = mongoose.model("livre",schemaLivre)
module.exports = Livre