const {  createReview, updateReview, replyReview, deleteReview, getReviews } = require("../controllers/reviewController");
const verifyToken = require("../middlewares/verifyToken")

const router = require("express").Router();



router.post("/create-review", verifyToken, createReview)
router.put("/update-review", verifyToken, updateReview )
router.delete("/delete-review/:id", verifyToken, deleteReview )
router.get("/get-reviews/:id", getReviews);
router.put("/reply-review/:id", verifyToken, replyReview)


module.exports = router
