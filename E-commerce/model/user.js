const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    mac_address:{
            type:String,
        },
    whishlist:{
            type:String,
    },
    fcm_token:{
            type:String,
            require:true,
    },
    notification:{
            type:String,
    },
    address1:{
            type:String,
    }, 
    address2:{
            type:String,
    },
    phone:{
            type:String,
    },
    email:{
            type:String,
    },
    gender:{
        type:String,
        enum:['male','female','other']
    },
    full_name:{
            type:String,
    },
    password:{
            type:String,
    },
    postal_code:{
            type:String,
    },
    city:{
        type:String
    },
    state:{
            type:String,
    },
    country:{
            type:String,
    },

},
{timestamps:true})

const user = new mongoose.model("users",schema)  
module.exports = user

