const jwt = require("jsonwebtoken")
exports.adminLogin = (req,res) =>{
    if(req.body.email == 'admin' && req.body.password == 'admin123'){
        const token = jwt.sign({email:req.body.email},process.env.ADMIN_SECRET)
        res.json({status:1,message:"Logged in successfull",token})
    }else{
        res.json({status:0,message:"invalid username or password"})
    }
}