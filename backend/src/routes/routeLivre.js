const express = require("express");
const router = express.Router();
const {
    creerLivre,
    obtenirTousLesLivres,
    obtenirLivreParId,
    obtenirLivreParCode,
    obtenirLivresParCategorie,
    obtenirLivresParStatus,
    rechercherLivres,
    modifierLivre,
    supprimerLivre
} = require("../controllers/controllerLivre"); // Ajustez le chemin selon votre structure

// Route pour créer un nouveau livre
// POST /api/livres
router.post("/creation", creerLivre);

// Route pour obtenir tous les livres
// GET /api/livres
router.get("/obtenir", obtenirTousLesLivres);

// Route pour rechercher des livres par titre ou auteur
// GET /api/livres/recherche?recherche=terme
router.get("/recherche", rechercherLivres);

// Route pour obtenir les livres par catégorie
// GET /api/livres/categorie/:categorie
router.get("/categorie/:categorie", obtenirLivresParCategorie);

// Route pour obtenir les livres par status
// GET /api/livres/status/:status
router.get("/status/:status", obtenirLivresParStatus);

// Route pour obtenir un livre par son code
// GET /api/livres/code/:code
router.get("/code/:code", obtenirLivreParCode);

// Route pour obtenir un livre par son ID
// GET /api/livres/:id
router.get("/obtenirLivre/:id", obtenirLivreParId);

// Route pour modifier un livre
// PUT /api/livres/:id
router.put("/modifierLivre/:id", modifierLivre);

// Route pour supprimer un livre
// DELETE /api/livres/:id
router.delete("/supprimerLivre:id", supprimerLivre);

module.exports = router;