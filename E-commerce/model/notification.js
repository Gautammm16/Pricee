const mongoose = require("mongoose")

const schema = new mongoose.Schema({
            
    user_id :{
        type:mongoose.Schema.Types.ObjectId,  
        ref : 'user',   
        require:true
    },
    
    content:{
    
        type:String, // type 
        require:true
    },
   
},
{timestamps:true})

const notification = new mongoose.model("notification",schema)  //"users" table ka naam hai
module.exports = notification

