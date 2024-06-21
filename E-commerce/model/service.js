const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name:{
        type:String,  
        require:true
    },
    price:{
        type:Number,  
        require:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,  
        ref : 'service_category',     
        require:true
    },
    description:{
        type:String,  
        require:true
    },
    place :{
        type:String,  
        require:true
    },
    image:{
        type:String,  
        
    },
    
   
},
{timestamps:true})

const service = new mongoose.model("service",schema)  
module.exports = service


