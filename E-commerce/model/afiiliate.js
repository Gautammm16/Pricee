const mongoose = require("mongoose")

const schema = new mongoose.Schema({
         // true = compulsory   false = not compulsory
    user_id :{
             type: mongoose.Schema.Types.ObjectId,  
            ref : 'user',   
            require:true
            },
         // true = compulsory   false = not compulsory
    product_id :{
        type: mongoose.Schema.Types.ObjectId, 
            ref : 'product',   
            require:true
            },
    affiliate_link:{
        type:String, // type 
        require:true
         },
   
},
{timestamps:true})

const affiliate = new mongoose.model("affiliate",schema)  //"users" table ka naam hai
module.exports = affiliate


