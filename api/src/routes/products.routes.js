const { Router }= require("express");
const {getProducts,createProducts,deleteProducts,updateProducts,getProductById,updateProductValues}=require("../controllers/products.controller.js")

const router = Router();



router.get("/products",getProducts);
router.post("/products",createProducts);
router.put("/products/:id",updateProducts);
router.delete("/products/:id",deleteProducts);
router.get("/products/:id",getProductById);
router.patch("/products/:id", updateProductValues);

module.exports=router;