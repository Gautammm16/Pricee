const jwt = require('jsonwebtoken')
require('dotenv').config()

const strictauth = (req,res,next)=>{
  if(!req.headers.auth){
    res.status(412).json({status:412,message:"invalid credential"})
  }
try {
  let token = req.headers.auth
    if(token){
    //console.log(req.session.user);
   const seller = jwt.verify(token,process.env.SELLER_SECRET);
   if(seller){  

   
        req.session.seller = seller
        req.session.seller.expires = new Date(
            Date.now() + 3 * 
            24 * 3600 * 1000 // session expires in 3 days
            )
            
            next();
        
   }
   else{   
    res.status(409).json({status:409,message:"Invalid Session Token of Seller"});
    }
   }
    
}

catch(e){
        res.json({status:0,message:"Internal Server Error on User Authentication"})
        console.log("Invalid Token "+ e);
}

}

module.exports = strictauth;
