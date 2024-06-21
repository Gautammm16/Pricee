const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    id:{
        type:Object, // type 
        require:true
        }, // true = compulsory   false = not compulsory
    name:{
            type:String,
            require:true,
        },
        brand : {
                type:String,
                require:true
        },
    discount:{
            type:String,
            require:true,
    },
    price:{
            type:String,
            require:true,
    },
    discounted_price:{
            type:String,
            require:true,
    },
    specification : [
                {
                        key:String,
                        value:String
                }
    ],
    category :{
            type:mongoose.Schema.Types.ObjectId,  
            ref : 'product_category',   
            require:true
        },
    
    sub_category :{
            type:mongoose.Schema.Types.ObjectId,  
            ref : 'product_sub_category',   
            require:true
        },
    
    description:{
            type:String,
            require:true,
    },
    is_verified : {
        type:Boolean,
        default:false,
        require:true,
    },
    is_blocked : {
        type:Boolean,
        default:false,
        require:true,
    },
    seller_id :{
        type:mongoose.Schema.Types.ObjectId,  
        ref : 'seller',   
        require:true
    },
    images:[{
            type:String,
            require:true,
    }],


},
{timestamps:true})

const product = new mongoose.model("product",schema)  //"users" table ka naam hai
module.exports = product

// foregin key bnane k liye yeh code likhiyo 

//  name :{
//     type: type:mongoose.Schema.Types.ObjectId,  _id = foreign key bnti hai iss liye objectId
//     ref : 'users',   table ka naam
//     require:true
// },
