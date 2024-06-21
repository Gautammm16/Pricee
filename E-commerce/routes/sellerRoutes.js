const express = require("express")
const sellerRoutes = express.Router()
const multer = require("multer")
const form = multer().array()
const crypto = require("crypto")
const sellerController = require("../sellerController/sellerController")
const productController = require("../sellerController/productController")
const Product = require("../model/product")

const sellerAuth = require("../middleware/sellerAuth")

const ProductStorage = multer.diskStorage({
    destination: function (req, file, cb) {
  
      cb(null, "uploads/seller/product");
    },
    filename: function (req, file, cb) {
  
      const uniqueSuffix =
      Date.now() + "-" +"product" +  "-" + crypto.randomBytes(6).toString("hex") ;
  
      cb(
        null,
        uniqueSuffix  + ".webp"
      );
    },
  });
  
  const ProductUpload = multer({
    storage: ProductStorage,
    fileFilter: (req, file, cb) => {
      
      if (
  
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/webp" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb("Only .png, .jpg and .jpeg format allowed!");
      }
    },
    limits:{
      fileSize:2 * 1024 * 1024
    }
  });

sellerRoutes.post("/register",form,sellerController.Register)
sellerRoutes.post("/confirmotp",form,sellerController.confirm_otp)
sellerRoutes.post("/setaddress",form,sellerController.setAddress)
sellerRoutes.post("/setdocument",form,sellerController.setDoc)
sellerRoutes.post("/login",form,sellerController.login)
// route for add product

sellerRoutes.post("/addproduct",sellerAuth,ProductUpload.array("product"),productController.add_product)
sellerRoutes.get("/getproducts",sellerAuth,productController.getSellerProduct)
sellerRoutes.post("/deleteproduct",sellerAuth,form,productController.deleteProduct)
sellerRoutes.get("/getsubcategory/:id",sellerAuth,productController.getSubCategory)
sellerRoutes.get("/getcategory",sellerAuth,productController.getCategory)
sellerRoutes.get("/getorders",sellerAuth,productController.getorder)
sellerRoutes.get("/getsales",sellerAuth,productController.getSales)
sellerRoutes.get("/getdetails",sellerAuth,sellerController.getDetails)
sellerRoutes.post("/acceptorder",sellerAuth,form,productController.acceptOrder)
sellerRoutes.post("/rejectorder",sellerAuth,form,productController.rejectOrder)




module.exports = sellerRoutes