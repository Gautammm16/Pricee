const Product = require("../model/product")
const product_sub_category = require("../model/product_sub_category")
const product_category = require("../model/product_category")
const fs = require("fs")
const service_category = require("../model/service_category")
const Service = require("../model/service")
// const Service_booking = require("../model/service_booking")
const Complaint = require("../model/complaint")

exports.addCategory = async(req,res)=>{
    const category = new product_category({
        name:req?.body?.name,
        tag:req?.body?.tag
    })
    const cat = await category.save()
    // console.log(cat)
    res.json({status:1,message:"category Added Successfully"})
}
exports.addSubCategory = async(req,res)=>{
    // console.log(req.body)
    const category = new product_sub_category({
        name:req?.body?.name,
        category_id : req.body.category_id
    })
    await category.save()
    res.json({status:1,message:"sub category Added Successfully"})
}

exports.getCategory = async(req,res)=>{
    const cat = await product_category.find().sort({name:1})
    if(cat.length > 0){
        return res.json({status:1,message:"Category Found",result:cat})
    }else{
        return res.json({status:0,message:"Category Not Found"})
    }
}
exports.getSubCategory = async(req,res) =>{
    if(!req.params.id || req.params.id == ""){
       return res.json({status:0,message:"Please Provide Proper Paramtere"})
    }
    const cat = await product_sub_category.find({category_id:req.params.id}).sort({name:1})
    
    if(cat.length > 0){
        return res.json({status:1,message:"Sub Category Found",result:cat})
    }else{
        return res.json({status:0,message:"Sub Category Not Found"})
    }
}

exports.deleteCategory = async (req,res)=>{
    const cat = await product_category.find({_id:req.body.category_id})
    if(cat.length > 0){
        await product_category.deleteOne({_id:req.body.category_id})
        await product_sub_category.deleteMany({category_id:req.body.category_id})
        return res.json({status:1,message:"Category Deleted Successfully"})
    }else{
        return res.json({status:0,message:"Category Not Found"})
    }
}



exports.deleteSubCategory = async (req,res)=>{
    const cat = await product_sub_category.find({_id:req.body.sub_category_id})
    if(cat.length > 0){
        await product_sub_category.deleteOne({_id:req.body.sub_category_id})
        return res.json({status:1,message:"Sub Category Deleted Successfully"})
    }else{
        return res.json({status:0,message:"Category Not Found"})
    }
}

exports.getPengingProduct = async(req,res) =>{
    const getProduct = await Product.find({is_verified:false}).populate("category").populate("sub_category")
    if(getProduct.length >0){

        const product = await getProduct.map((e)=>{
            const images =   e.images.map((f)=>{
                if(f.length>0){
                    if(fs.existsSync(`uploads/seller/product/${f}`)){
                        const path = process.env.PRODUCT_IMAGE_URL
                        return `${path}/${f}`
                    }else{
                        return ''
                    }      
                    
                }else{
                    return ''
                }
            })
            e.images = images
            return e
        })
        // console.log(product )
        return res.json({status:1,message:"Pending Product Found !",result:product})
    }else{
        return res.json({status:0,message:"No Data Found"})
    }
}
exports.getAllProduct = async(req,res) =>{
    const getProduct = await Product.find({is_verified:true}).populate("category").populate("sub_category")
    if(getProduct.length >0){

        const product = await getProduct.map((e)=>{
            const images =   e.images.map((f)=>{
                if(f.length>0){
                    if(fs.existsSync(`uploads/seller/product/${f}`)){
                        const path = process.env.PRODUCT_IMAGE_URL
                        return `${path}/${f}`
                    }else{
                        return ''
                    }      
                    
                }else{
                    return ''
                }
            })
            e.images = images
            return e
        })
        
        return res.json({status:1,message:"Pending Product Found !",result:product})
    }else{
        return res.json({status:0,message:"No Data Found"})
    }
}
exports.getReportedProduct = async(req,res) =>{
    const getProduct = await Product.find({is_blocked:true}).populate("category").populate("sub_category")
    if(getProduct.length >0){

        const product = await getProduct.map((e)=>{
            const images =   e.images.map((f)=>{
                if(f.length>0){
                    if(fs.existsSync(`uploads/seller/product/${f}`)){
                        const path = process.env.PRODUCT_IMAGE_URL
                        return `${path}/${f}`
                    }else{
                        return ''
                    }      
                    
                }else{
                    return ''
                }
            })
            e.images = images
            return e
        })
        
        return res.json({status:1,message:"Pending Product Found !",result:product})
    }else{
        return res.json({status:0,message:"No Data Found"})
    }
}
exports.acceptProduct = async(req,res) =>{
    await Product.findOneAndUpdate({_id:req.body.product_id},{is_verified:true})
    return res.json({status:1,message:"Product Accepted Successfully!"})
} 
exports.bloackProduct = async(req,res) =>{
    await Product.findOneAndUpdate({_id:req.body.product_id},{is_blocked:true})
    return res.json({status:1,message:"Product Accepted Successfully!"})
} 

exports.addServiceCategory = async (req,res)=>{
       const cat = new service_category({
        name:req.body.name
       })
       const s = await cat.save()
    //    console.log(s)
       return res.json({status:1,message:"Category Addedd Successfully!"})
}
exports.deleteServiceCategory = async (req,res)=>{
    await service_category.findOneAndDelete({_id:req.body.category_id})
    return res.json({status:1,message:"Category Deleted Successfully!"})
} 
exports.getServiceCategory = async (req,res)=>{
    const cat = await service_category.find()
    if(cat.length>0){

        return res.json({status:1,message:"Category Data Found!",result:cat})
    }else{
        return res.json({status:0,message:"Category Not Found!"})

    }
}
exports.getComplaint = async(req,res) =>{
    const complaint  = await Complaint.find().populate("user_id").populate("product_id")
    // console.log(complaint);
    if(complaint.length>0){
    const product = await complaint.map((e)=>{
        const images =   e.product_id.images.map((f)=>{
            if(f.length>0){
                if(fs.existsSync(`uploads/seller/product/${f}`)){
                    const path = process.env.PRODUCT_IMAGE_URL
                    return `${path}/${f}`
                }else{
                    return ''
                }      
                
            }else{
                return ''
            }
        })
        e.product_id.images = images
        return e
    })
    
        return res.json({status:1,message:"Complaint Data Found!",result:product})
    }else{
        return res.json({status:0,message:"Complaint Not Found!"})

    }
}
// exports.addTourPackeges = (req,res) =>{
    
// }

// exports.addTours = async (req,res) =>{
//     var data = {}
//             Object.assign(data,JSON.parse(req.body.data))
//     // const data = JSON.parse(req.body.data)
//     const file = req.file.filename
//         data.category = data.category.value
//         data.image = file

//      const service = new Service(data)
//      await service.save()
//      return res.json({status:1,message:"Successfully Addedd Tour"})


// }

// exports.getTours = async(req,res) =>{
//     let page = req.params.page
//     let limit = 6
//     page = (page-1)*limit 
//     const ToursData = await Service.find({},{},{skip:page,limit:limit})
//     const total = await Service.count()
//     if(ToursData.length>0){
//         const data = ToursData.map((e)=>{
//                 if(e.image && e.image != ""){
//                     if(fs.existsSync(`uploads/tours/${e.image}`)){
//                         const path = process.env.TOUR_IMAGE_URL
//                         var image = `${path}/${e.image}`
//                     }else{
//                         var image = ""
//                     }
//                 }else {
//                     var image = ""
//                 }
//                 e.image = image
//                 return e
//         })
//         console.log(data)
//         if(data.length>0){
//             return res.json({status:1,message:"Data Found!", result:data,total})
//         }else{    
//             return res.json({status:0,message:"No Data Found!"})
//         }
//     }
// }

// exports.getBookings = async(req,res)=>{
//     const Booking = await Service_booking.find().populate("user_id","-password").populate("service_id")
//     if(Booking.length>0){
//         return res.json({status:1,message:"Booking Found",result:Booking})
//     }else{
//         return res.json({status:0,message:"No Data Found!"})

//     }

// }
// exports.deleteBooking = async(req,res) =>{
//     await Service_booking.deleteOne({_id:req.body.service_id})
//     return res.json({status:1,message:"Booking Found",result:Booking})
// }