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
   const admin = jwt.verify(token,process.env.ADMIN_SECRET);
   if(admin){  

   
        req.session.admin = admin  
        req.session.admin.expires = new Date(
            Date.now() + 3 * 
            24 * 3600 * 1000 // session expires in 3 days
            )
            
            next();
        
   }
   else{   
    res.status(409).json({status:409,message:"invalid session token of user"});
    }
   }
    
}

catch(e){
        res.json({status:0,message:"internal server error on user authentication"})
        console.log("invalid token "+ e);
}

}

module.exports = strictauth;
