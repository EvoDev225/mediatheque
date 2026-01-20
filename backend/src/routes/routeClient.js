const express = require("express");
const router = express.Router();
const {
    creerClient,
    obtenirTousLesClients,
    obtenirClientParId,
    modifierClient,
    supprimerClient,
    ObtenirClientParDate
} = require("../controllers/controllerClient"); // Ajustez le chemin selon votre structure

// Route pour créer un nouveau client
// POST /api/clients
router.post("/creation", creerClient);

// Route pour obtenir tous les clients
// GET /api/clients
router.get("/obtenirClient", obtenirTousLesClients);

// Route pour obtenir un client par son ID
// GET /api/clients/:id
router.get("/obtenirClient/:id", obtenirClientParId);

// Route pour modifier un client
// PUT /api/clients/:id
router.put("/obtenirClient/:id", modifierClient);

// Route pour supprimer un client
// DELETE /api/clients/:id
router.delete("/supprimerClient/:id", supprimerClient);

module.exports = router;