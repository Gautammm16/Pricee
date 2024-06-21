const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    category_id :{
        type:mongoose.Schema.Types.ObjectId,  
        ref : 'category',   
        require:true
    },
    name:{
        type:String,  
        require:true
    },
   
},
{timestamps:true})

const service_sub_category = new mongoose.model("service_sub_category",schema)  
module.exports = service_sub_category

