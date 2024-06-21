const orders = require("../model/orders");
const Product = require("../model/product");
const product_category = require("../model/product_category");
const product_sub_category = require("../model/product_sub_category");
const fs = require("fs");



exports.add_product = async(req,res) =>{

    const seller_id = req.session.seller.id
    
    var specification = JSON.parse(req.body.specification)
    // if( typeof(req.body.specification) == 'string' ){
    //         specification.push(JSON.parse(req.body.specification))
    // }else{
    //      req.body.specification.map((e)=>{
    //         specification.push(JSON.parse(e))
    //     })
    // }

    var productImage = req.files?.map((e)=>{
            return e.filename
    })
    const discount = ((parseInt(req.body.price) - parseInt(req.body.discounted_price))*100)/parseInt(req.body.price)
    const product = new Product({
        name:req.body.name.trim(),
        description:req.body.description.trim(),
        price:req.body.price.trim(),
        discounted_price : req.body.discounted_price,
        category:req.body.category,
        sub_category:req.body.sub_category,
        brand:req.body.brand,
        discount:discount,
        specification:specification,
        seller_id:seller_id,
        images:productImage

    })
     await product.save()
     return res.json({status:1,message:"Product Added Successfully"})
}
exports.UpdateProduct = async(req,res) =>{
    if(!req.body.product_id || req.body.product_id == "" ){
        return res.json({status:0,message:"Internal Server Error"})
    }
    const seller_id = req.session.seller.id
    const product = await Product.findOneAndUpdate({_id:req.body.product_id},{
        name:req.body.name.trim(),
        description:req.body.description.trim(),
        price:req.body.price.trim(),
        discount_price : req.body.discount_price,
        category:req.body.category,
        sub_category:req.body.sub_category,
        brand:req.body.brand,
        discount:req.body.discount,
        seller_id:seller_id

    })
    
    return res.json({status:1,message:"Product updated Successfully"})
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
    const cat = await product_sub_category.find({category_id:req?.params?.id}).sort({name:1})
    if(cat.length > 0){
        return res.json({status:1,message:"Category Found",result:cat})
    }else{
        return res.json({status:0,message:"Category Not Found"})
    }
}
exports.getSellerProduct = async(req,res) =>{
    
    const product = await Product.find({seller_id:req.session.seller.id}).populate("category").populate("sub_category")
    if(product.length>0){
        const data =  product.map((e)=>{
                if(e?.images.length>0){
                    const image = e?.images.map((e)=>{
                            if(fs.existsSync(`uploads/seller/product/${e}`)){
                            var path = `${process.env.PRODUCT_IMAGE_URL}/${e}`
                            }else {
                                path = ""
                            }
                        return path
                    })
                  e.images = image
                  return e
                }
        })
        
        return res.json({status:1,message:"Product Found Successfully",result:data})   
    }else{
        return res.json({status:0,message:"Product Not Found!"})   

    }
}
//  exports.getorder = async(req,res) =>{
//     if(!req.body.seller_id || req.body.seller_id == "" ){
//         return res.json({status:0,message:"Internal Server Error"})
//     }
//     const order = await orders.find({'product_id.seller_id':req.body.seller_id,acceptBySeller:0})
//     if(order.length>0){
//         return res.json({status:1,message:"Order Found Successfully",order})   
//     }else{
//         return res.json({status:0,message:"Order Not Found!"})   

//     }
//  }
 exports.deleteProduct = async(req,res) =>{

    if(!req.body.product_id || req.body.product_id == "" ){
        return res.json({status:0,message:"Internal Server Error"})
    }
     await Product.deleteOne({_id:req.body.product_id})
     return res.json({status:1,message:"product Deleted Successfully"})   
 }
 exports.getSales = async(req,res) =>{
    const order = await orders.find({'product_data.seller_id':req.session.seller.id,acceptBySeller:1}).populate("product_data.id").populate("product_data.id.category").populate("product_data.id.sub_category")
    var data = order.map((e)=>{
       if(e.product_data.some((f)=>f.seller_id == req.session.seller.id)){
            
           return e
        }
    })
    
    if(data.length>0){
        return res.json({status:1,message:"saled Found Successfully",result:data,seller_id:req.session.seller.id})   
    }else{
        return res.json({status:0,message:"Sales Not Found!"})   

    }
 }
 exports.getorder = async(req,res) =>{
    
    const order = await orders.find({'product_data.seller_id':req.session.seller.id,acceptBySeller:0}).populate("product_data.id").populate("product_data.id.category").populate("product_data.id.sub_category")
    var data = order.map((e)=>{
       if(e.product_data.some((f)=>f.seller_id == req.session.seller.id)){
            
           return e
        }
    })
    
    if(data.length>0){
        return res.json({status:1,message:"orders Found Successfully",result:data,seller_id:req.session.seller.id})   
    }else{
        return res.json({status:0,message:"orders Not Found!"})   

    }
 }
exports.acceptOrder = async(req,res) =>{
    await orders.findOneAndUpdate({_id:req.body.order_id},{acceptBySeller:1})
    return res.json({status:1,message:"orders Accepted Successfully"})   
}
exports.rejectOrder = async(req,res) =>{
    await orders.findOneAndUpdate({_id:req.body.order_id},{acceptBySeller:-1})
    return res.json({status:1,message:"orders Accepted Successfully"})   
}