const {ROLES} = require("../utils/constants")
const Review = require ("../models/Review")
const Product = require("../models/Product")

  
const createReview = async(req, res) =>{
    if(req.role !== ROLES.user){
        return res.status(401).json({
            success : false,
            message : "Access denied"
        })
    }

    const userId = req.id;

    try {
        const {productId, review, rating} = req.body;

        const newReview = await Review.create({
            productId,
            review,
            userId,
            rating
        });
        newReview.populate("userId", "name")
        
        let product = await Product.findByIdAndUpdate(productId,{
            $push : {reviews : newReview._id}
        });

        await product.calculateRating();

        return res.status(201).json({
            success : true ,
            message : "Thanks for the Review",
            data : newReview
        })
        

        
    } catch (error) {
        return res.status(500).json({ success : false , message : error.message });
    }


};

const updateReview = async (req, res) =>{
    if(req.rolo !== ROLES.user){
        return res.status(401).json({success : false, message : "Access denied"})
    }

    try {
        const {id} = req.params;
        const {updatedReview} = req.body

        let review = await Review.findByIdAndUpdate(
            id,
            {review : updatedReview},
            {new : true}
        );

        await review.populate("userId", "name")
        if(!review){
            res
                .status(404)
                .json({ success : true , message : "Review not found"})
        }

        return res
            .status(200)
            .json({ success : true,
                data : review,
                message : "Review updated"
            })
    } catch (error) {
        return res.status(500).json({ success : false , message : error.message });
    }


};

const replyReview = async(req, res)=>{
    if(req.rolo !== ROLES.user){
        return res.status(401).json({success : false, message : "Access denied"})
    }

    const userId = req.id;
    const {id} = req.params;


    try {

        const {review} = req.body
        let foundReview = await Review.findByIdAndUpdate(
            { _id : id, },
            {$push : {replies : {userId , review}}},
            {new : true}
        )
            .populate("replies.userId", "name")
            .populate("userId", "name")
        
        if(!foundReview){
            return res
                .status(404)
                .json({success : false, message : "Review not found"})
        }
        
        return res.status(200).json({
            success : true,
            data : foundReview,
            message : "Reply added successfully"
        })
         
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
};

const deleteReview = async (req, res)=>{
    if(req.rolo !== ROLES.user){
        return res.status(401).json({success : false, message : "Access denied"})
    }
    
    try {
        const {id} = req.params;
        
       let review = await Review.findByIdAndDelete(id);

       if (!review){
        return res
            .status(404)
            .json({success : false, message : "Review not found"})
       }

       let product = await Product.findByIdAndUpdate(review.productId, {
        $pull : { review : review._id },
       });

       await product.calculateRating();

       if (!review){
        return res
            .status(404)
            .json({success : false, message : "Review not found"})
       }
        
        
        return res
            .status(200)
            .json({
            success : true,
            data : foundReview,
            message : "Reply added successfully"
        })
         
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
};


const getReviews = async(req, res) =>{
    try {
        const { id } = req.params;
        
        let reviews = await Review.find({ productId : id })
            .populate({
                path : "userId",
                select : "name"
            })
            .populate({
                path : "replies.userId",
                select : "name"
            });

        if(!reviews){
            return res 
                .status(404)
                .json({success : false, message : "Review not found"})
        }

        return res
            .status(200)
            .json({success : true, data : reviews, message : "Reviews found"});

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}


module.exports = {
    createReview,
    updateReview,
    replyReview,
    deleteReview,
    getReviews
}