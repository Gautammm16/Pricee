const mongoose = require("mongoose")

const schema = new mongoose.Schema({

    seller_id :{
        type:mongoose.Schema.Types.ObjectId,  
        ref : 'seller',   
        require:true
    },
    ifsc : {
        type:String,
        require:true
    },
    account_number : {
        type:String,
        require:true
    },
    holder_name : {
        type:String,
        require:true,
    }
   
},
{timestamps:true})

const seller_bank_details = new mongoose.model("seller_bank_details",schema)  //"users" table ka naam hai
module.exports = seller_bank_details
