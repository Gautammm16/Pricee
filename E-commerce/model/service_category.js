const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name:{
        type:String, // type 
        require:true
         },
   

         
},
{timestamps:true})

const service_category = new mongoose.model("service_category",schema)  //"users" table ka naam hai
module.exports = service_category

