const express=require("express")
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const connectDB = require("./config/db")
const cors=require("cors")
const app = express()
const routerUtilisateur = require('./routes/routeAuthentificationUtilisateur')
dotenv.config()
app.use(express.json())
app.use(cors({origin: "http://localhost:3000",credentials:true}))
app.use(cookieParser())

connectDB()
app.use('/',routerUtilisateur)




app.listen(process.env.PORT ,()=>{
    console.log(`Le serveur tourne !`)
})