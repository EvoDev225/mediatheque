const express = require("express");
const router = express.Router();
const {
    creerEspace,
    obtenirTousLesEspaces,
    obtenirEspaceParId,
    modifierEspace,
    supprimerEspace
} = require("../controllers/controllerEspace"); // Ajustez le chemin selon votre structure

// Route pour créer un nouveau espace
// POST /api/espaces
router.post("/insertion", creerEspace);

// Route pour obtenir tous les espaces
// GET /api/espaces
router.get("/obtenirEspace", obtenirTousLesEspaces);

// Route pour obtenir un espace par son ID
// GET /api/espaces/:id
router.get("/obtenirEspaceUnique/:id", obtenirEspaceParId);

// Route pour modifier un espace
// PUT /api/espaces/:id
router.put("/modifierEspace/:id", modifierEspace);

// Route pour supprimer un espace
// DELETE /api/espaces/:id
router.delete("/supprimerEspace/:id", supprimerEspace);

module.exports = router;