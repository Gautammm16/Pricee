const mongoose = require("mongoose")

const schema = new mongoose.Schema({    
    user_id :{
        type:mongoose.Schema.Types.ObjectId, 
        ref : 'user',   
        require:true
    },
    
    cart:[{
        
         id : {type:mongoose.Schema.Types.ObjectId, 
        ref : 'product',   
        require:true},
        quantity:{
            type:Number
        }
    }],
   
},
{timestamps:true})

const user_report = new mongoose.model("user_cart",schema)  //"users" table ka naam hai
module.exports = user_report

