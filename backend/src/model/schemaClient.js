const mongoose = require("mongoose")
const schemaClient = new mongoose.Schema({
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    email:{type:String,required:true},
    contact:{type:String,required:true},
    visite:{
        type:String, 
        required:true
    }
},{timestamps:true})

const Client = mongoose.model("client",schemaClient)
module.exports = Client