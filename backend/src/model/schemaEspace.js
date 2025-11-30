const mongoose = require("mongoose")
const schemaEspace = new mongoose.Schema({
libelle:{
    type:String,
    required:true
}
},{timestamps:true})

const Espace = mongoose.model("espace",schemaEspace)
module.exports = Espace