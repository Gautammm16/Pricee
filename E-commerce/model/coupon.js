const mongoose = require("mongoose")

const schema = new mongoose.Schema({
      
    title:{
        type:String,  
        require:true,
        
    },
    discount:{
        type:String,  
        require:true
    },
    status:{
        type:Boolean,  
        require:true
    },
    
   
},
{timestamps:true})

const coupons = new mongoose.model("coupons",schema)  //"users" table ka naam hai
module.exports = coupons


