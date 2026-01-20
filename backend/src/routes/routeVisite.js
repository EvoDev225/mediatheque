const express = require("express")
const { creation, afficherVisite, dateAfficherVisite, majVisite, supprimerVisite,afficherVisiteParId } = require("../controllers/controllerVisite")

const router  = express.Router()

router.post('/creation',creation)
router.post('/dateAfficherVisite',dateAfficherVisite)
router.get('/afficherVisite',afficherVisite)
router.get('/afficherVisite/:id',afficherVisiteParId)
router.put('/majVisite/:id',majVisite)
router.delete('/supprimerVisite/:id',supprimerVisite)



module.exports = router