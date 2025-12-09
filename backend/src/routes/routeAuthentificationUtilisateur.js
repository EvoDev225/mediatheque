const express = require("express")
const {
    inscription,
    emailVerifier,
    connexion, deconnexion,
    motdepasseOublier, 
    reinitialiserMotdepasse,
    verifierAuthentification,
    afficherToutUtilisateur,
    majUtilisateurAdministrateur, 
    majUtilisateurEmploye, 
    desactiverUtilisateur,
    reactiverUtilisateur,
    changerAutorisationEmploye
    } = require("../controllers/controllerAuthentificationUtilisateur")
const {verificationJeton,verifierAdmin} = require("../middlewares/verificationJeton")
const router = express.Router()

//Initialisation des routes
router.post("/api/auth/inscription",inscription)
router.post("/api/auth/connexion",connexion)
router.post("/api/auth/deconnexion",deconnexion)
router.post("/api/auth/verifierEmail",emailVerifier)
router.post("/api/auth/motdepasseOublier",motdepasseOublier)
router.post("/api/auth/motdepasseReinitialiser/:token",reinitialiserMotdepasse)

// Authentification
router.get("/api/auth/verification", verificationJeton, verifierAuthentification)

// ADMIN : voir tous les utilisateurs
router.get("/api/auth/toutUtilisateur",verificationJeton,afficherToutUtilisateur)

// ADMIN : mise à jour utilisateur
router.patch("/api/auth/majAdministrateur/:id", verifierAdmin,verificationJeton,  majUtilisateurAdministrateur)

// EMPLOYE : mise à jour de ses propres infos
router.patch("/api/auth/majEmploye/:id", verificationJeton, majUtilisateurEmploye)

// ADMIN : désactiver
router.patch("/api/auth/desactiverUtilisateur/:id", verificationJeton , desactiverUtilisateur)

// ADMIN : réactiver
router.patch("/api/auth/reactiverUtilisateur/:id", verificationJeton , reactiverUtilisateur)
//Changer le niceau de sécurité
router.patch("/api/auth/changerNiveau/:id", verificationJeton , changerAutorisationEmploye)

module.exports = router