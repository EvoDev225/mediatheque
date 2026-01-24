const {getAllChildren, newChildren, deleteChildren, editChildren} = require("../controllers/controllerChildren")
const express = require("express")
const router = express.Router()

router.get("/getAllchildren",getAllChildren)
router.post('/newChildren',newChildren)
router.delete('/deleteChildren/:id',deleteChildren)
router.put('/editChildren/:id',editChildren)


module.exports = router