const express = require("express")
const adminRoutes = express.Router()
const multer = require("multer")
const form = multer().array()
const crypto = require("crypto")
const productController = require("../adminController/productController")
const sellerController = require("../adminController/sellerController")
const adminController = require("../adminController/adminController")


// const ToursStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
  
//       cb(null, "uploads/tours");
//     },
//     filename: function (req, file, cb) {
  
//       const uniqueSuffix =
//       Date.now() + "-" +"product" +  "-" + crypto.randomBytes(6).toString("hex") ;
  
//       cb(
//         null,
//         uniqueSuffix  + ".webp"
//       );
//     },
//   });
  
//   const tourUpload = multer({
//     storage: ToursStorage,
//     fileFilter: (req, file, cb) => {
      
//       if (
  
//         file.mimetype == "image/png" ||
//         file.mimetype == "image/jpg" ||
//         file.mimetype == "image/webp" ||
//         file.mimetype == "image/jpeg"
//       ) {
//         cb(null, true);
//       } else {
//         cb(null, false);
//         return cb("Only .png, .jpg and .jpeg format allowed!");
//       }
//     },
//     limits:{
//       fileSize:2 * 1024 * 1024
//     }
//   });

 adminRoutes.get("/getcategory",productController.getCategory    )
adminRoutes.get("/getsubcategory/:id",productController.getSubCategory)
adminRoutes.post("/addcategory",form,productController.addCategory)
adminRoutes.get("/getpendingproduct",form,productController.getPengingProduct)
adminRoutes.get("/getreportedproduct",form,productController.getReportedProduct)
adminRoutes.get("/getallproduct",form,productController.getAllProduct)
adminRoutes.post("/addsubcategory",form,productController.addSubCategory)
adminRoutes.post("/deletecategory",form,productController.deleteCategory)
adminRoutes.post("/deletesubcategory",form,productController.deleteSubCategory)
adminRoutes.get("/getpendingseller",form,sellerController.getPendingSeller)
adminRoutes.get("/getreportedseller",form,sellerController.getReportedSeller)
adminRoutes.post("/acceptproduct",form,productController.acceptProduct)
adminRoutes.post("/acceptpendingseller",form,sellerController.acceptPendingSeller)
adminRoutes.post("/rejectseller",form,sellerController.rejectSeller)
adminRoutes.post("/blockproduct",form,productController.bloackProduct)
adminRoutes.get("/getseller",form,sellerController.getSeller)
adminRoutes.get("/getservicecategory",form,productController.getServiceCategory)
adminRoutes.post("/addservicecategory",form,productController.addServiceCategory)
// adminRoutes.post("/addtours",tourUpload.single("image"),productController.addTours)
// adminRoutes.post("/gettours/:page",productController.getTours)
// adminRoutes.post("/deleteservicecategory",form,productController.deleteServiceCategory)
adminRoutes.post('/login',form,adminController.adminLogin)
adminRoutes.get('/getcomplaint',productController.getComplaint)
// adminRoutes.get('/getbookings',productController.getBookings)
// adminRoutes.post('/deletebooking',form,productController.deleteBooking)

module.exports = adminRoutes