const User = require("../model/user")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const address = require("address")
require("dotenv").config()
const product_category = require("../model/product_category")
const product_sub_category = require("../model/product_sub_category")
const service_category = require("../model/service_category")
const service_sub_category = require("../model/service_sub_category")
const user_cart = require("../model/user_cart")
const Product = require("../model/product");
const fs = require("fs");
const orders = require("../model/orders");
const moment = require("moment")
const easyinvoice = require("easyinvoice");
const Complaint = require("../model/complaint");
const stripe = require("stripe")("sk_test_51MrIdjSDwNSVBNJvRkC2hvAZqJlKH9OsMk5asAIjubDK8aDwX2tCojZN98xUFdgnClz23JocdgQhjyhC9vMGKZvd00dYkv8xeo")


exports.LoginUser = async(req,res) =>{
    if(!req.body?.email || req.body?.email == "" ){
        return res.status(406).json({status:0,message:"please give proper parameter"})
    }
    if(!req.body.password || req.body.password == "" ){
        return res.status(406).json({status:0,message:"please give proper parameter"})
    }

    if(isNaN(parseInt(req.body.email))){

        var user = await User.find({email:req.body.email})
    }else{
        var user = await  User.find({phone:req.body.email})

    }
    if(user.length>0){
        const confirmpass = await bcrypt.compare(req.body.password,user[0].password)
        if(confirmpass){
            token = jwt.sign({id:user[0]._id,email:user[0].email},process.env.USER_SECRET)
            delete user[0].password 
            return res.status(201).json({status:1,message:"User Logged In Successfully!",token,result:user[0]})
        }else{
            return res.status(406).json({status:0,message:"invalid password"})  
        }
    }else{
        return res.status(406).json({status:0,message:"invalid email or phone"})  
    }
}

exports.loginWithGoogle = async(req,res) =>{
    if(!req.body?.email || req.body?.email == "" ){
        return res.status(406).json({status:0,message:"please give proper parameter"})
    }
    if(!req.body.full_name || req.body.full_name == "" ){
        return res.status(406).json({status:0,message:"please give proper parameter"})
    }

    const user = await User.find({email:req.body.email})
    // console.log(user);
    if(user.length > 0){
        delete user[0]?.password 
        const token = jwt.sign({id:user[0]._id,email:user[0].email},process.env.USER_SECRET)
        return res.status(201).json({status:1,message:"User Logged In Successfully!",token,result:user[0]})
    }else{
        const register = new User({
            email:req.body.email,
            full_name:req.body.full_name
        })
        const finaluser = await register.save()
            const token = jwt.sign({id:finaluser._id,email:finaluser.email},process.env.USER_SECRET)
            console.log(token);
            return res.status(201).json({status:1,message:"User Register In Successfully!",token,result:finaluser})
        
    }
}
exports.registerUser = async(req,res) =>{
    console.log(req.body);
    if(!req.body?.email || req.body?.email == "" ){
        return res.status(406).json({status:0,message:"please give proper parameter"})
    }
    if(!req.body.password || req.body.password == "" ){
        return res.status(406).json({status:0,message:"please give proper parameter"})
    }
    if(!req.body?.phone || req.body?.phone == "" ){
        return res.status(406).json({status:0,message:"please give proper parameter"})
    }
    if(!req.body.full_name || req.body.full_name == "" ){
        return res.status(406).json({status:0,message:"please give proper parameter"})
    }
    const user = await User.find({email:req.body.email})
    if(user.length > 0){
        return res.status(201).json({status:-1,message:"This Email Already Exist!"})
    }else{
        const hash = await bcrypt.hash(req.body.password,10)
        const register = new User({
            email:req.body.email,
            full_name:req.body.full_name,
            phone : req.body?.phone,
            password:hash

        })
        const finaluser = await register.save()
            const token = jwt.sign({id:finaluser._id,email:finaluser.email},process.env.USER_SECRET)
            return res.status(201).json({status:1,message:"User Register In Successfully!",token,result:finaluser})
        
    }

}

exports.getCart = async(req,res) =>{
    const id = req.session.user.id 
    const cart = user_cart.find({user_id:id}).populate("cart.id")
    if(cart.length>0){
        const prodcutWithImageURL = cart.cart.map((e)=>{
            const images =   e.id.images.map((f)=>{
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
              e.id.images = images
              return e
          })
        return res.status(201).json({status:1,message:"User !",result:prodcutWithImageURL})
    }else{
        return res.status(406).json({status:0,message:"No Cart Found"})
    }
}

exports.addCart = async(req,res) =>{
    const id = req.session.user.id 
    const checkcart = await user_cart.find({user_id:id})
    if(checkcart.length>0){

        const checkProduct = await user_cart.find({user_id:id,cart:{$elemMatch:{id:req.body.product_id}}}).populate("cart")
        if(checkProduct.length>0){
            
            await user_cart.findOneAndUpdate({'cart.id':req.body.product_id},{'cart.quantity':req.body.quantity})
            return res.status(201).json({status:1,message:"Cart Updated Successfully"})
        }else{
            await user_cart.findOneAndUpdate({user_id:id},{$push:{cart:{id:req.body.product_id,quantity:req.body.quantity}}})
            return res.status(201).json({status:1,message:"Cart Inserted Successfully",})
        }
    }else{
        const cart = new user_cart({
            user_id : id,
            cart : [{
                id:req.body.product_id,
                quantity:req.body.quantity
            }]
        })
        await cart.save()
        return res.status(201).json({status:1,message:"Cart Inserted Successfully"})
    }

}

exports.getCartForLocatStorage = async(req,res) =>{
    const data = JSON.parse(req.body.data)
    const PrductData = data.map(async(e)=>{
        const findProduct = await Product.find({_id:e.id})
        if(findProduct.length>0){
            const images =   findProduct[0].images.map((f)=>{
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
            findProduct[0].images = images
            return ({
                product:findProduct[0],
                quantity:e.q
            })
        }else{
            return null
        }
    })
    const finalReponse = await Promise.all(PrductData)

    if(finalReponse.length>0){
            return res.json({status:1,message:"Cart Product Found",result:finalReponse})
    }else{
        return res.json({status:0,message:"Cart Product Found",})
    }
}

exports.getUserDetails = async(req,res) =>{
    const userdetail = await User.find({_id:req.session.user.id})

    if(userdetail.length>0){
        return res.json({status:1,message:"User Data Found!",result:userdetail[0]})
    }else{
        return res.json({status:0,message:"User Not Found!"})
    }
}
exports.updateUserDetail = async(req,res) =>{
        const body = JSON.parse(req.body.data)
    const userdetail = await User.findOneAndUpdate({_id:req.session.user.id},body)
    console.log(userdetail)
    return res.json({status:1,message:"User Data Found!",result:userdetail})
}

exports.userPayment = async(req,res) =>{
    const product  = JSON.parse(req.body.product_data)
    if(product.length>0){
        
            var product_data = product.map(async(e)=>{
                const productData = await Product.find({_id:e.product._id})
                return ({id:e.product._id,quantity:e.quantity,seller_id:productData[0].seller_id})
            })
            product_data = await Promise.all(product_data)
            console.log(product_data)
        const order = new orders({
            user_id:req.session.user.id,
            product_data,
            order_date:moment().local().format(),
            price:req.body.amount.replace(/\D/g,'')
        })
       const cretedorder =  await order.save()
        const payment = await stripe.paymentIntents.create({
                amount:req.body.amount.replace(/\D/g,''),
                currency:'inr',
                description:"payment testing ",
                payment_method : req.body.id,
            
            })
            return res.json({status:1,message:"Successfully Ordered !"})
        }else{
            return res.json({status:0,message:"Internal server Error !"})
        }
}


exports.getOrders = async(req,res) =>{
    const order = await orders.find({user_id:req.session.user.id,acceptBySeller:1}).populate("product_data.id").populate("product_data.id.category").populate("product_data.id.sub_category")
    console.log(order);
    
    if(order.length>0){
        return res.json({status:1,message:"orders Found Successfully",result:order,user_id:req.session.user.id})   
    }else{
        return res.json({status:0,message:"orders Not Found!"})   

    }
}
exports.generateInvoice = async(req,res) =>{

    const order = await orders.find({_id:req.body.order_id}).populate("user_id").populate("product_data.id")
    var data = {

        // Let's add a recipient
        "client": {
            "name": order[0].user_id.full_name,
            "address": order[0].user_id.address1,
            "zip": order[0].user_id.address1,
            "city": order[0].user_id.city,
            "country": order[0].user_id.country,
        },
    
        // Now let's add our own sender details
        "sender": {
            "company": "pricee corporation",
            "address": "lal darwaza,udhana",
            "zip": "394210",
            "city": "surat",
            "country": "India"
        },
    
        // Of course we would like to use our own logo and/or background on this invoice. There are a few ways to do this.
        "images": {
            //      Logo:
            // 1.   Use a url
            logo: fs.readFileSync('uploads/invoice/logo.png', 'base64'),
                background: fs.readFileSync('uploads/invoice/invoice-bg.jpg', 'base64'),
             
        },
    
        // Let's add some standard invoice data, like invoice number, date and due-date
        "information": {
            // Invoice number
            "number": order[0]._id,
            // Invoice data
            "date": order[0].order_date,
            // Invoice due date
        },
    
        // Now let's add some products! Calculations will be done automatically for you.
        "products": 
            // {
            //     "quantity": "2",
            //     "description": "Test1",
            //     "tax-rate": 6,
            //     "price": 33.87
            // },
            order[0].product_data.map((e)=>{
                return({
                    quantity:e.quantity, 
                    description:e.id.description,  
                    price:e.id.discounted_price,  
                })
            }),
    
        // We will use bottomNotice to add a message of choice to the bottom of our invoice
    
        // Here you can customize your invoice dimensions, currency, tax notation, and number formatting based on your locale
        "settings": {
            "currency": "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
            /* 
             "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')         
             "tax-notation": "gst", // Defaults to 'vat'
             // Using margin we can regulate how much white space we would like to have from the edges of our invoice
             "margin-top": 25, // Defaults to '25'
             "margin-right": 25, // Defaults to '25'
             "margin-left": 25, // Defaults to '25'
             "margin-bottom": 25, // Defaults to '25'
             "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
             "height": "1000px", // allowed units: mm, cm, in, px
             "width": "500px", // allowed units: mm, cm, in, px
             "orientation": "landscape", // portrait or landscape, defaults to portrait         
             */
        },
    
        /*
            Last but not least, the translate parameter.
            Used for translating the invoice to your preferred language.
            Defaults to English. Below example is translated to Dutch.
            We will not use translate in this sample to keep our samples readable.
         */
        "translate": {
            /*
             "invoice": "FACTUUR",  // Default to 'INVOICE'
             "number": "Nummer", // Defaults to 'Number'
             "date": "Datum", // Default to 'Date'
             "due-date": "Verloopdatum", // Defaults to 'Due Date'
             "subtotal": "Subtotaal", // Defaults to 'Subtotal'
             "products": "Producten", // Defaults to 'Products'
             "quantity": "Aantal", // Default to 'Quantity'
             "price": "Prijs", // Defaults to 'Price'
             "product-total": "Totaal", // Defaults to 'Total'
             "total": "Totaal" // Defaults to 'Total'        
             */
        },
    
        /*
            Customize enables you to provide your own templates.
            Please review the documentation for instructions and examples.
            Leave this option blank to use the default template
         */
        "customize": {
            // "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
        },
    };
    easyinvoice.createInvoice(data, function (result) {
        /*  
            5.  The 'result' variable will contain our invoice as a base64 encoded PDF
                Now let's save our invoice to our local filesystem so we can have a look!
                We will be using the 'fs' library we imported above for this.
        */
       res.json({status:1,message:"found",result : result.pdf})
        fs.writeFileSync("uploads/invoice/invoice.pdf", result.pdf,'base64');
    });
}
exports.complaintProduct = async(req,res) =>{
    const checkComplaint = await Complaint.find({user_id:req.session.user.id,product_id:req.body.product_id})
    if(checkComplaint.length>0){
        return res.json({status:-1,message:"Already Complained!"})
    }else{

        const complaint = new Complaint({
            user_id:req.session.user.id,
            product_id:req.body.product_id,
            complaint:req.body.complaint
        })
        await complaint.save()
        return res.json({status:1,message:"Successfull complained"})
    }

}