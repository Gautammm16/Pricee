const express = require("express")
const app = express()
const https = require("http")
const moment = require("moment")
const router = require("./routes/userRoutes")
const adminRoute = require("./routes/adminRoutes")
const sellerRoutes = require("./routes/sellerRoutes")
const fs =require("fs")
const path = require("path")
const bodyparser= require("body-parser")
const models = path.join(__dirname,"model")
const mongoose = require("mongoose")
const cors = require("cors")
const session = require('express-session');
const server = https.createServer(
//      {
//      key:fs.readFileSync(path.join(__dirname,"cert",'key.pem')),
//   cert:fs.readFileSync(path.join(__dirname,"cert",'cert.pem')),
// },
app)
app.use(cors())
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(path.join(models, file)));

app.use(express.static("public"));
require("./db/connection") 
app.use(
  session({
    key:"seller",
    secret: process.env.SELLER_SECRET, //this is secret key of user 
    resave: true,
    saveUninitialized: false
  })
  );
  app.use(
    session({
      key:"admin",
      secret: process.env.ADMIN_SECRET, 
      resave: true,
      saveUninitialized: false
    }));
app.use(
      session({
        key:"user",
        secret: process.env.USER_SECRET, 
        resave: true,
        saveUninitialized: false
      }));
app.use('/seller',sellerRoutes)
app.use('/api',router)
app.use('/admin',adminRoute)
app.use('/', express.static('public'))

app.use("/upload",express.static('uploads/'))
app.get("/",(req,res)=>{
    res.send("hey")
})

server.listen(4040,()=>{
console.log("server is running on 4040");
})

  