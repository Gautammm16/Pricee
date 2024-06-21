const mongoose = require("mongoose")

const schema = new mongoose.Schema({

    seller_id :{
        type:mongoose.Schema.Types.ObjectId,  
        ref : 'seller',   
        require:true
    },
    gstn : {
        type:String,
        require:true
    },
    pan_no : {
        type:String,
        require:true
    },
    adhar_no : {
        type:String,
        require:true,
    }
   
},
{timestamps:true})

const seller_document = new mongoose.model("seller_document",schema)  //"users" table ka naam hai
module.exports = seller_document
