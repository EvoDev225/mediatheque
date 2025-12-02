const mongoose = require("mongoose")
const schemaService = new mongoose.Schema({
    libelle:{type:String,required:true}
},{timestamps:true})

const Service = mongoose.model("service",schemaService)
module.exports = Service