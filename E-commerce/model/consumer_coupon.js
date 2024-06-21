const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    company_name:{
        type:String, // type 
        require:true
    },
        

            
    coupon_id :{
        type:mongoose.Schema.Types.ObjectId, 
        ref : 'coupon',   
        require:true
    },
    category_id :{
        type:mongoose.Schema.Types.ObjectId, 
        ref : 'category',   
        require:true
    },
    service_id :{
        type:mongoose.Schema.Types.ObjectId, 
        ref : 'service',   
        require:true
    },
    
    status:{
    
        type:Boolean, // type 
        require:true
    },
    
   
},
{timestamps:true})

const consumer_coupons = new mongoose.model("consumer_coupons",schema)  //"users" table ka naam hai
module.exports = consumer_coupons

