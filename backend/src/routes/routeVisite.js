const express = require("express")
const { creation, afficherVisite, dateAfficherVisite, majVisite, supprimerVisite } = require("../controllers/controllerVisite")

const router  = express.Router()

router.post('/creation',creation)
router.post('/dateAfficherVisite',dateAfficherVisite)
router.put('/majVisite/:id',majVisite)
router.delete('/supprimerVisite/:id',supprimerVisite)



module.exports = router