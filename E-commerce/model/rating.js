const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    id:{
        type:Object, // type 
        require:true
    },            
    product_id :{
        type:mongoose.Schema.Types.ObjectId, 
        ref : 'product',   
        require:true
    },
    rater_user_id :{
        type:mongoose.Schema.Types.ObjectId, 
        ref : '',   
        require:true
    },
    
    rate_count:{
    
        type:String, // type 
        require:true
    },
    status:{
    
        type:Boolean, // type 
        require:true
    },
   
},
{timestamps:true})

const rating = new mongoose.model("rating",schema)  //"users" table ka naam hai
module.exports = rating

