const mongoose = require("mongoose")

const schema = new mongoose.Schema({    
    user_id :{
        type:mongoose.Schema.Types.ObjectId, 
        ref : 'user',   
        require:true
    },
    
    seller_id:{
    
        type:mongoose.Schema.Types.ObjectId, 
        ref : 'user',   
        require:true
    },
   
},
{timestamps:true})

const user_report = new mongoose.model("seller_report",schema)  //"users" table ka naam hai
module.exports = user_report

