const bcrypt = require("bcrypt")
const Seller = require("../model/seller")
const {mainSend} = require("../sendmail/index")
const moment = require("moment")
const seller_document = require("../model/seller_document")
const sendMail = require("../sendmail/index")
const jwt = require("jsonwebtoken")

 generateOTP = (length = 4) => {
    let otp = ''

    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10)
    }

    return otp
}
exports.getDetails = async (req,res) =>{
    const seller = await Seller.find({_id:req.session.seller.id})

    if(seller.length>0){
        return res.json({status:1,message:"Data Got Successfully",result:seller[0]})
    }else{
        return res.json({status:1,message:"Data Not Found",})

    }
}
exports.Register = async(req,res) =>{
    const seller = await Seller.find({email:req.body.email})
    if(seller.length == 0 ){

        const otp = generateOTP(6)
        console.log(otp)
        
        mainSend({otp:otp,mail:req.body.email},async(c)=>{
            if(c == true){
                
                const hash = await bcrypt.hash(req.body.password,10)
                const newseller = new Seller({
                    name:req.body.name.trim(),
                    email:req.body.email.trim(),
                      password:hash,
                      bussiness_name:req.body.bussiness_name,
                      otp:otp,
                      otp_expireAt:moment().local().add(30,"minutes"),
                      building:req.body.houseno,
                      area:req.body.area,
                      city:req.body.city,
                      state:req.body.state,
                      country:req.body.country
                    })
                    const sellerinfo = await newseller.save()
                    const sellerDoc = new seller_document({
                        seller_id : sellerinfo._id,
                        gstn :req.body.gstn,
                      adhar_no : req.body.adhar_no,
                      pan_no : req.body.pan_no,

                    })
                    await sellerDoc.save()
                    return res.json({status:1,message:"Email Sent Successfully"})
                }
                
            })
        }else{
            if(seller[0].otp_verified == true){

                return res.json({status:-1,message:"Email Already Exist!"})
            }else{
                mainSend({otp:otp,mail:req.body.email},async(c)=>{
                    if(c == true){
                        const newseller =  await Seller.findOneAndUpdate({_id:seller[0]._id},{
                              otp:otp,
                              otp_expireAt:moment().local().add(30,"minutes"),
                            })
                            return res.json({status:1,message:"Email Sent Successfully"})
                        }
                        
                    })

            }
        }
}

exports.resend_otp = async (req,res)=>{
    const otp = generateOTP(6)
        const seller = await Seller.findOneAndUpdate({email:req.body.email},{otp:otp,otp_expireAt:moment().local().add(30,"minutes")})
        res.json({status:1,message:"Otp Sent Successfully"})

}
exports.confirm_otp  = async (req,res) =>{
    if(!req.body.otp || req.body.otp == "" ){
        return res.json({status:0,message:"Please Provide Otp"})
    }
    if(!req.body.email || req.body.email == "" ){
        return res.json({status:0,message:"Please Provide email"})
    }
    const seller = await Seller.find({email:req.body.email})
    if(seller.length>0){
        if(req.body.otp == seller[0].otp && moment().local().format()<moment(seller[0].otp_expireAt).local().format()){
            await Seller.findOneAndUpdate({email:req.body.email},{otp_verified:true})
            return res.json({status:1,message:"Otp Verified Successfully"})    
        }else{
            return res.json({status:-1,message:"You Entered Wrong Otp Or Otp Is Expired"})      
        }
    }else{
        return res.json({status:0,message:"Please Provide email"})  
    }

}
exports.setDoc = async(req,res) =>{
    const seller = await Seller.findOne({email:req.body.email})
    if(seller.length > 0){
        const doc = await seller_document.find({seller_id:seller[0]._id})
        if(doc.length>0){
           return res.json({status:0,message:"Already Uploaded"})
        }else{
            const docdata = new seller_document({
                seller_id:seller[0]._id,
                
            })
            await docdata.save()
            return res.json({status:1,message:"Document Verified Successfully"})
        }

    }else{
        return res.json({status:0,message:"User Not Found"})
    }
}
exports.setAddress = async(req,res)=>{
    const seller = await Seller.findOne({email:req.body.email})
    if(seller.length > 0){
            await Seller.findOneAndUpdate({email:req.body.email},{})
            return res.json({status:1,message:"Seller Registerd Successfully"})
    }else{
       return res.json({status:0,message:"Seller Not Found"})
    }

}

exports.login = async(req,res) =>{
    if(!req.body.password || req.body.password == "" ){
        return res.json({status:0,message:"Please Provide Password"})
    }
    if(!req.body.email || req.body.email == "" ){
        return res.json({status:0,message:"Please Provide email"})
    } 

    const seller = await Seller.find({email:req.body?.email})
    
    if(seller.length>0){
        if(seller[0].is_verified == true){

            const check = await bcrypt.compare(req.body.password,seller[0].password)
            if(check == true){
                
                const jwtdata = {
                    id: seller[0]._id,
                    time: Date(),
                };
                
                const token = jwt.sign(jwtdata, process.env.SELLER_SECRET);
                req.session.seller = {
                    id: seller[0]._id,
                }; 
                req.session.seller.expires = new Date(
                    Date.now() + 3 * 24 * 3600 * 1000 // session expires in 3 days
                    );
                    
                    return res.json({status:1,message:"Seller logged in Successfully",token}) 
                }else{
                    return res.json({status:-1,message:"Invalid Password"}) 
                    
                }
            }else{
                if(seller[0].isBlockedByAdmin == true){

                    return res.json({status:-3,message:"Seller Blocked By Admin"})
                }
                return res.json({status:-2,message:"Admin Not Verified Yet"})
            }
    }else{
        return res.json({status:0,message:"Seller Not Found"}) 
    }
}

exports.addProduct = (req,res) =>{
    
}