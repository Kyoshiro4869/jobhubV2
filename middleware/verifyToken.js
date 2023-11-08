const jwt = require('jsonwebtoken');

const verifyToken = (req, res ,next) =>{
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.spilt("")[1];

    jwt.verify(token,process.env.JWT_SEC,async(err,user) => {
      if(err){
        return res.status(401).json({message:"Invalid token"})
      }
      res.user = user;
      next();
    })
  } 
};

const verifyAndAuth = (req, res , next) => {
  verifyToken(req,res,() => {
    if(req.user.id || req.user.isAdimin){
      next();
    }else{
      return res.status(403).json({message:"You are not authorized to access"})
    }
  })
}
const verifyAgent = (req, res , next) => {
  verifyToken(req,res,() => {
    if(req.user.isAgent || req.user.isAdimin){
      next();
    }else{
      return res.status(403).json({message:"You are not authorized to access"})
    }
  })
}

module.exports = {verifyToken, verifyAndAuth,verifyAgent}
