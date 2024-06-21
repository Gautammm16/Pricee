const mongoose = require("mongoose")

const schema = new mongoose.Schema({

    name:{
            type:String,
            require:true,
        },
        password : {
            type:String,
        },
    building:{
            type:String,
    },
    area:{
        type:String,
    },
   
    city:{
        type:String,
    },
    state:{
        type:String,
    },
    country:{
        type:String,
    },
    profile_image:{
            type:String,
            require:true,
    },
    email:{
            type:String,
            require:true,
    },
    phone:{
            type:String,
            require:true,   
    },
    otp:{
        type:String,
        require:true
    },
    otp_expireAt :{
        type:String,
        require:true
    },
    otp_verified :{
        type:Boolean,
        require:true,
        default:false,
    },
    is_verified : {
        type:Boolean,
        require:true,
        default:false,
    },
    is_reported:{
        type:Boolean,
        require:true,
        default:false,
    },
    document_verified:{
        type:Boolean,
        require:true,
        default:false,
    },
    bussiness_name:{
        type:String,
        require:true,   
    },
    image:{
            type:String,
            require:true,
    },
    isBlockedByAdmin : {
        type:Boolean,
        require:true,
        default:false,
    },
    admin_block_type : {
        type:Number,
        require:true,
    },
   status:{
        type:Boolean,
        require:true,
        default:true,
   }
},
{timestamps:true})

const seller = new mongoose.model("seller",schema) 
module.exports = seller
