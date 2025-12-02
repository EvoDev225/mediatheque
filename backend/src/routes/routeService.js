const express = require("express")
const {creationService,afficherService, majService, supprimerService} = require("../controllers/controllerService")

const router  = express.Router()

router.post('/enregistrement',creationService)
router.put('/majService/:id',majService)
router.delete('/supprimerService/:id',supprimerService)
router.get('/afficherService',afficherService)


module.exports = router