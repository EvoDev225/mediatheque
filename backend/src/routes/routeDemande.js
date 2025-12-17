const { AfficherDemandes,CreerDemande,SupprimerDemande } =  require("../controllers/ControllerDemande") 

const express = require("express")
const router = express.Router()

// Routes principales
router.get('/', AfficherDemandes) // GET toutes les demandes
router.post('/', CreerDemande) // POST créer une demande
router.delete('/:id', SupprimerDemande) // DELETE supprimer une demande

module.exports = router