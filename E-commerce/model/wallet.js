const mongoose = require("mongoose")

const schema = new mongoose.Schema({
         // true = compulsory   false = not compulsory
    user_id :{
        type: mongoose.Schema.Types.ObjectId,  
            ref : 'user',   
            require:true
         },
         
    seller_id :{
        type: mongoose.Schema.Types.ObjectId,  
            ref : 'seller',   
            require:true
         },

    amount:{
        type:Object, // type 
        require:true
         },
    type:{
        type:Object, // type 
        require:true
    },
},
{timestamps:true})

const wallet = new mongoose.model("wallet",schema)  //"users" table ka naam hai
module.exports = wallet

