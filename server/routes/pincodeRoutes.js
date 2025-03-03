const { addPincodes, getPincodes } = require("../controllers/pincodeController")
const router = require("express").Router()
const verifyToken = require("../middlewares/verifyToken")

router.post("/add-pincode", verifyToken, addPincodes)
router.get("/get-picode/:pincode", getPincodes)



module.exports = router