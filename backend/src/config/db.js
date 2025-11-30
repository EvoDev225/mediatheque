const mongoose = require("mongoose")
require('dotenv').config()
const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Base de donnée connecté !")
    } catch (error) {
        console.log("Base de donnée non connectée :",error)
    }
}
module.exports = connectDB