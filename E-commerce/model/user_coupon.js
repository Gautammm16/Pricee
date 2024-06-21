const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    
    user_id :{
            type:mongoose.Schema.Types.ObjectId,  
            ref : 'user',   
            require:true
        },
    coupne_id :{
            type:mongoose.Schema.Types.ObjectId,  
            ref : 'coupne',   
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

const user_coupnes = new mongoose.model("user_coupnes",schema)  //"users" table ka naam hai
module.exports = user_coupnes


