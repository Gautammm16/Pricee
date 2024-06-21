const mongoose = require("mongoose")

const schema = new mongoose.Schema({
         // true = compulsory   false = not compulsory
    user_id :{
        type: mongoose.Schema.Types.ObjectId,  
            ref : 'users',   
            require:true
    },
         // true = compulsory   false = not compulsory
    product_id :{
        type: mongoose.Schema.Types.ObjectId,  
            ref : 'product',   
            require:true
            },
    complaint:{
        type:String, // type 
        
    },
    status:{
        type:Boolean, // type 
        require:true
    },
    
   
},
{timestamps:true})

const complaint = new mongoose.model("complaint",schema)  //"users" table ka naam hai
module.exports = complaint


