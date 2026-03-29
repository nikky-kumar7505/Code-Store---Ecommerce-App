const Razorpay = require("razorpay")
const User = require("../models/User")
var { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
const Product = require("../models/Product")
const Order = require("../models/Order");

var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });


const generatePayment = async (req, res) =>{
    const userId = req.id;
    const { amount } = req.body

    if (amount == null || Number(amount) <= 0) {
        return res.status(400).json({ success: false, message: "Valid amount is required" })
    }

    try {

        const  options = {
            amount: Number(amount) * 100,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            receipt: Math.random().toString(36).substring(2),

          };
        
        const user = await User.findById(userId)
        if(!user) 
            return res.status(404).json({success : false, message : "Usernot found"})

        instance.orders.create(options, async(err, order)=> {
           if(err){
            console.log(err);
            return res.status(500).json({success : false , message : err} )
           }

           return res.status(200).json({
            success : true,
            data : {
                ...order,
                name : user.name,
            }
           })
          });

    } catch (error) {
        return res.status(500).json({success : false, message : error.message})
    }
};

const verifyPayment = async(req, res) =>{
    const userId = req.id;

    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            amount,
            productArray,
            address,
        } = req.body

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Missing razorpay_order_id, razorpay_payment_id, or razorpay_signature",
            })
        }

        if (!Array.isArray(productArray) || productArray.length === 0) {
            return res.status(400).json({ success: false, message: "productArray is required" })
        }

        const validatedPayment = validatePaymentVerification(
            { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
            razorpay_signature,
            process.env.RAZORPAY_KEY_SECRET
        );

        if(!validatedPayment){
            return res
                .status(400)
                .json({success : false, message : "Payment verification failed"})
        }

        const productsForOrder = productArray.map((p) => ({
            id: p.id,
            quantity: p.quantity,
            color: (p.color && String(p.color).trim()) ? p.color : "default",
        }))

        for(const product of productArray){
            await User.findByIdAndUpdate(
                {_id : userId},
                {$push : {purchasedProduct : product.id}}
            );

             await Product.findByIdAndUpdate(
                {_id : product.id},
                {$inc : {stock : -Number(product.quantity)}}
            )
        }

        const amountPaise = Number(amount)
        const amountRupees = amountPaise >= 100 ? amountPaise / 100 : amountPaise

        await Order.create({
            amount : amountRupees,
            razorpayOrderId  : razorpay_order_id,
            razorpayPaymentId : razorpay_payment_id,
            razorpaySignature : razorpay_signature,
            products : productsForOrder,
            address : address,
            userId : userId,

        })

        return res.status(200).json({success : true, message : "Payment verified"})
        
    } catch (error) {
        return res.status(500).json({success : false, message : error.message})
    }
};

module.exports = {generatePayment, verifyPayment};