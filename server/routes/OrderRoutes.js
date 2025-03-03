const router = require("express").Router()
const verifyToken = require("../middlewares/verifyToken")
const {  getOrdersByUserId, getAllOrders, updateOrderStatus, getMetrics } =  require("../controllers/OrderController")

router.get("/get-order-by-user-id", verifyToken, getOrdersByUserId )
router.get("/get-all-orders", verifyToken, getAllOrders)
router.get("/get-metrics", verifyToken, getMetrics)
router.put("/update-order-status/:paymentId", verifyToken, updateOrderStatus)

module.exports = router