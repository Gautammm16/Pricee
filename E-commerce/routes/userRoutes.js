const express = require("express")
const router = express.Router()
const ProductController = require("../controller/ProductController.js")
const userController  = require("../controller/userController.js")
const userAuth = require("../middleware/userAuth.js")
const multer = require("multer")
const form = multer().array()
const crypto = require("crypto")
const product_category = require("../model/product_category.js")
const product = require("../model/product.js")


const UserProfile = multer.diskStorage({
    destination: function (req, file, cb) {
  
      cb(null, "uploads/seller/product");
    },
    filename: function (req, file, cb) {
  
      const uniqueSuffix =
      Date.now() + "-" + crypto.randomBytes(6).toString("hex") ;
  
      cb(
        null,
        uniqueSuffix  + ".webp"
      );
    },
  });
  
  const UserProfileUpload = multer({
    storage: UserProfile,
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

router.get("/new-release",ProductController.getpopularproduct)
router.post("/login",form,userController.LoginUser)
router.post("/loginwithgoogle",form,userController.loginWithGoogle)
router.get("/getpopularcat",ProductController.getPopularCat)
router.get("/getproducts/:cat/:subcat?/:page",ProductController.getProduct)
router.post("/register",form,userController.registerUser)
router.get("/getcategories",form,ProductController.getCat)
router.get("/getsingleproduct/:url",ProductController.getSingleProduct)
router.get("/getoursingleproduct/:url",ProductController.getOurSingleProduct)
router.post("/addcart",form,userAuth,userController.addCart)
router.post("/getcart",form,userAuth,userController.addCart)
router.post("/getcartforlocalstorage",form,userController.getCartForLocatStorage)
router.post("/userpayment",form,userAuth,userController.userPayment)
router.get("/getuserdetails",form,userAuth,userController.getUserDetails)
router.post("/updateuser",form,userAuth,userController.updateUserDetail)
router.get("/searchproduct/:q/:page",ProductController.searchProducts)
router.get("/searchproductkeywords/:key",ProductController.getSearchKeyWords)
router.get("/popularsearches",ProductController.getPopularSearch)
router.get("/gettourcategory",ProductController.getServiceCategory)
router.get("/getorders",userAuth,userController.getOrders)
router.post("/printbill",userAuth,form,userController.generateInvoice)
router.post("/complaint",userAuth,form,userController.complaintProduct)


module.exports = router