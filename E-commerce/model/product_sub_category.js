const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    category_id :{
            type:mongoose.Schema.Types.ObjectId,  
            ref : 'product_category',   
            require:true
        },
    name:{
            type:String,
            require:true,
    },
   
},
{timestamps:true})

const product_sub_category = new mongoose.model("product_sub_category",schema)  //"users" table ka naam hai
module.exports = product_sub_category
