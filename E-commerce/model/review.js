const mongoose = require("mongoose")

const schema = new mongoose.Schema({
   
    product_id :{
        type:mongoose.Schema.Types.ObjectId, 
        ref : 'product',   
        require:true
    },
    reviewed_user_id :{
        type:mongoose.Schema.Types.ObjectId, 
        ref : '',   
        require:true
    },

    
    review:{
    
        type:String, // type 
        require:true
    },
    status:{
    
        type:String, // type 
        require:true
    },
   
},
{timestamps:true})

const review = new mongoose.model("review",schema)  //"users" table ka naam hai
module.exports = review

