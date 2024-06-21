const mongoose = require("mongoose")

const schema = new mongoose.Schema({   
    service_id :{
        type:mongoose.Schema.Types.ObjectId,  
        ref : 'service',   
        require:true
    },
    user_id :{
        type:mongoose.Schema.Types.ObjectId,  
        ref : 'user',   
        require:true
    },
    payment_id :{
        type:mongoose.Schema.Types.ObjectId,  
        ref : 'payment  ',   
        require:true
    },
    status:{
        type:Boolean, // type 
        default:true,
        require:true
    },
   
},
{timestamps:true})

const service_history = new mongoose.model("service_history",schema)  //"users" table ka naam hai
module.exports = service_history

