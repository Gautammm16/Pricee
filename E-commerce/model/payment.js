const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    payment_method:{
            type:String,
            require:true,
    },
   
},
{timestamps:true})

const payments = new mongoose.model("payments",schema)  //"users" table ka naam hai
module.exports = payments
