const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name:{
            type:String,
            require:true,
        },
    tag : {
        type:String,
        require:true
    }
},
{timestamps:true})

const product_category = new mongoose.model("product_category",schema)  
module.exports = product_category
