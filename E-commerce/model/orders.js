const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    
    user_id :{
            type:mongoose.Schema.Types.ObjectId,  
            ref : 'users',   
            require:true
        },
    product_data:[{
           id: { type:mongoose.Schema.Types.ObjectId,  
            ref : 'product',   
            require:true
        },
        quantity:{
            type:String,
            require:true,
            },
        seller_id:{
            type:mongoose.Schema.Types.ObjectId,  
            ref : 'seller',   
            require:true
        }
        }],
   
    order_date:{
            type:String,
            require:true,
    },
    price:{
            type:String,
            require:true,
    },
    acceptBySeller : {
        type:Number,
        default:0,
        enum:[0,-1,1], 
         require:true
    },
    status:{
            type:Boolean,
            require:true,
    },
    type:{
        type:Number,
        default:1,
        require:true
    }


},
{timestamps:true})

const orders = new mongoose.model("orders",schema)  //"users" table ka naam hai
module.exports = orders

