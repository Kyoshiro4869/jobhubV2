const User = require('../models/User')

module.exports = {
  updateUser: async(req,res) =>{
    try{
      await User.findByIdAndUpdate(req.user.id,
        {$set: req.body}, {new:true})
      res.status(200).json({status:true})  
    } catch(error){
      res.status(500).json({error:error})
    }
  },
  deleteUser:async(req, res)=>{
    try{
      await User.findByIdAndDelete(req.user.id)
    } catch (error){
      res.status(500).json({error:error})
    }
  },
  getUser: async(req,res)=>{
    try{
      console.log('getUser function called'); // Debug log
      const profile = await User.findById(req.user.id)
      const {password,createdAt,updatedAt,__v,...userData} = profile.doc;
  
      console.log('User data retrieved: ', userData); // Debug log
      res.status(200).json(userData)
    } catch (error){
      console.log('Error in getUser: ', error.message); // Debug log
      res.status(500).json({error:error})
    }
  }
}