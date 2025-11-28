const express = require("express")
const {inscription,emailVerifier, connexion, deconnexion, motdepasseOublier, reinitialiserMotdepasse, verifierAuthentification, afficherToutUtilisateur} = require("../controllers/controllerAuthentificationUtilisateur")
const verificationJeton = require("../middlewares/verificationJeton")
const router = express.Router()

//Initialisation des routes
router.post("/api/auth/inscription",inscription)
router.post("/api/auth/connexion",connexion)
router.post("/api/auth/deconnexion",deconnexion)
router.post("/api/auth/verifierEmail",emailVerifier)
router.post("/api/auth/motdepasseOublier",motdepasseOublier)
router.post("/api/auth/motdepasseReinitialiser/:token",reinitialiserMotdepasse)
router.post("/api/auth/verification",verificationJeton,verifierAuthentification)
router.get("/api/auth/toutUtilisateur",afficherToutUtilisateur)
module.exports = router