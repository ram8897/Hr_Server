const asyncHandler = require('express-async-handler')
const Address = require('../schemas/Address')
const User = require('../schemas/User')

 const getAddress = asyncHandler(async (req, res) => {
   try{
      const getAllAddresses = await Address.find({});
      res.status(200).json(getAllAddresses);
   } catch {
     res.status(500)
     throw new Error(err.message);
   }
 })
const createAddress = asyncHandler( async (req, res)=>{
    try {

       const address = new Address(req.body);
       await address.save();

       const user = await User.findById({_id: address.userId}).populate('address');
       user.address.push(address);
       
       await user.save();
       res.status(200).json({message: "Address Added Successfully", user })
 
    } catch (err) {
       res.status(400).json({success: false, message:err.message})
    }
 })
module.exports = { getAddress, createAddress }