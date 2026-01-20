    const express = require("express")
    const {
        inscription,
        connexion, deconnexion,
        motdepasseOublier, 
        reinitialiserMotdepasse,
        verifierAuthentification,
        afficherToutUtilisateur,
        majUtilisateurAdministrateur, 
        majUtilisateurEmploye, 
        desactiverUtilisateur,
        reactiverUtilisateur,
        changerAutorisationEmploye,
        supprimerUtilisateur
        } = require("../controllers/controllerAuthentificationUtilisateur")
    const {verificationJeton,verifierAdmin} = require("../middlewares/verificationJeton")
    const router = express.Router()

    //Initialisation des routes
    router.post("/api/auth/inscription",inscription)
    router.post("/api/auth/connexion",connexion)
    router.post("/api/auth/deconnexion",deconnexion)
    router.post("/api/auth/motdepasseOublier",motdepasseOublier)
    router.post("/api/auth/motdepasseReinitialiser/:token",reinitialiserMotdepasse)
    router.delete("/api/auth/supprimerUtilisateur/:id",supprimerUtilisateur)

    // Authentification
    router.get("/api/auth/verification", verificationJeton, verifierAuthentification)

    // ADMIN : voir tous les utilisateurs
    router.get("/api/auth/toutUtilisateur",verificationJeton,afficherToutUtilisateur)

    // ADMIN : mise à jour utilisateur
    router.patch("/api/auth/majAdministrateur/:id",verificationJeton, verifierAdmin,  majUtilisateurAdministrateur)

    // EMPLOYE : mise à jour de ses propres infos
    router.patch("/api/auth/majEmploye/:id", verificationJeton, majUtilisateurEmploye)

    // ADMIN : désactiver
    router.patch("/api/auth/desactiverUtilisateur/:id", verificationJeton, desactiverUtilisateur)

    // ADMIN : réactiver
    router.patch("/api/auth/reactiverUtilisateur/:id", verificationJeton, reactiverUtilisateur)
    //Changer le niceau de sécurité
    router.patch("/api/auth/changerNiveau/:id", verificationJeton , changerAutorisationEmploye)

    module.exports = router