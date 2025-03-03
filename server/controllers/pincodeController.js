const Pincode = require("../models/Pincode")
const {ROLES} = require("../utils/constants")

const addPincodes = async (req, res)=>{

    //only admin can add pincode
    if(req.role !== ROLES.admin){
        return res.status(401).json({
            success : false, 
            message : "Access denied" 
        });
    } 


    const {pincodes} = req.body //accepting a array [ {id:1 , pincode  : 121212}, {id:1 , pincode  : 121212} ]
    
    if (!pincodes || pincodes.length === 0){
           return res.status(400).json({success : false, message : "Please provide the pincode" });
    }

    try {
        const existingPincode = await Pincode.find({
            pincode : { $in : pincodes.map((p) => p.pincode) },
        })

        const existingPincodeValue = existingPincode.map((p) =>p.pincode )

        const newPincodes = pincodes.filter(
            (p) => !existingPincodeValue.includes(p.pincode)
        )

        if(newPincodes.length === 0 ) {
            return res.status(400).json({success : false, message : "All pincodes already exists"})
        }
        
        await Pincode.insertMany(newPincodes)

        return res
            .status(200)
            .json({ success : true, message : "Pincode added successfully" })

    } catch (error) {
        return res.status(500).json({ message : error.message, success : false})
    }
};

const getPincodes = async (req, res) =>{
    const {pincode} = req.params;

    try {

        const existingPincode = await Pincode.find({pincode})

        if (existingPincode.length === 0){ 
            return res.status(404).json({
                success : false ,
                message : "NO delivery available for this product"
            })
        }

        return res.status(200).json({
            success : true,
            message  : "Delivery available" ,

        })
        
    } catch (error) {
        return res.status(500).json({message : error.message , success : false})
    }
}


module.exports = {getPincodes, addPincodes }