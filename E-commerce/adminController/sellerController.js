const Seller = require("../model/seller.js")
const seller_document = require("../model/seller_document.js")
const seller_report = require("../model/seller_report.js")


exports.getPendingSeller = async(req,res) =>{
    const pendingSeller = await Seller.find({is_verified:false,otp_verified:true})
    if(pendingSeller.length > 0){
        return res.json({status:1,message:"Pending Seller Data Found",result:pendingSeller})
    }else{
        return res.json({status:0,message:"No Pending Seller Found"})
    }
}
exports.acceptPendingSeller = async(req,res) =>{
    const pendingSeller = await Seller.findOneAndUpdate({_id:req.body.seller_id,otp_verified:true},{is_verified:true})
   
        return res.json({status:1,message:"Pending Seller accepted Successfully",result:pendingSeller})
}
exports.rejectSeller = async(req,res) =>{
    // console.log(req.body);
    const pendingSeller = await Seller.findOneAndUpdate({_id:req.body.seller_id,otp_verified:true},{isBlockedByAdmin:true})
        return res.json({status:1,message:"Pending Seller blocked Successfully",result:pendingSeller})
}
exports.getSeller = async(req,res) =>{
    const pendingSeller = await Seller.find({is_verified:true,otp_verified:true,isBlockedByAdmin:false,})
    if(pendingSeller.length > 0){
        const data = pendingSeller.map(async(e)=>{
            const documents = await seller_document.find({seller_id:e._id})
            if(documents.length>0){
                return({
                    _id:e._id,
                    name:e.name,
                    bussiness_name:e.bussiness_name,
                    email:e.email,
                    createdAt:e.createdAt,
                    documents:documents[0],
                })
            }
        })
        const finalSeller = await Promise.all(data)
        return res.json({status:1,message:"Pending Seller Data Found",result:finalSeller})
    }else{
        return res.json({status:0,message:"No Pending Seller Found"})
    }
}
exports.getReportedSeller = async(req,res) =>{
    const pendingSeller = await Seller.find({isBlockedByAdmin:false,is_reported:true})
    if(pendingSeller.length > 0){
        return res.json({status:1,message:"Pending Seller Data Found",result:pendingSeller})
    }else{
        return res.json({status:0,message:"No Pending Seller Found"})
    }
}
