const mongoose = require("mongoose")
const schemaClient = new mongoose.Schema({
    date:{type:String,required:true,
            match: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    },
    numero:{type:Number,required:true},
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    email:{type:String},
    contact:{type:String,required:true},
    visite:{
        type:String, 
        required:true
    },
    profession:{type:String,required:true}
},{timestamps:true})

const Client = mongoose.model("client",schemaClient)
module.exports = Client