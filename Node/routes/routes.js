
const express = require("express");

const {
    addProduct,
    getProduct,
    getSingleProduct,
    deleteProduct,
    filterResult,
} = require("../controller/controller");

let router = express.Router();

router.get("/",filterResult);
router.post("/addproduct", addProduct);
router.get("/getproduct", getProduct);
router.get("/getsingleproduct/:pid", getSingleProduct);
router.delete("/deleteproduct/:pid", deleteProduct);

module.exports = router;
