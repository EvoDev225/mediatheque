const express=require("express")
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const connectDB = require("./config/db")
const cors=require("cors")
const app = express()
const routerUtilisateur = require('./routes/routeAuthentificationUtilisateur')
const routerService = require("./routes/routeService")
const routerVisite = require("./routes/routeVisite")
const routerClient = require("./routes/routeClient")
const routerEspace = require("./routes/routeEspace")
const routerLivre = require("./routes/routeLivre")
dotenv.config()
app.use(express.json())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())

connectDB()
app.use('/utilisateur',routerUtilisateur)
app.use('/service',routerService)
app.use('/visite',routerVisite)
app.use('/client',routerClient)
app.use('/espace',routerEspace)
app.use('/livre',routerLivre)




app.listen(process.env.PORT ,()=>{
    console.log(`Le serveur tourne !`)
})