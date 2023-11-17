
let Product = require("../models/models");

let addProduct = async (req, res, next) => {
    let { id, name, category, imageURL, description } = req.body;

    let newProduct = await Product.create({
        id,
        name,
        category,
        imageURL,
        description,
    });
    res.status(201).json({
        error: false,
        message: "Product Added successfully",
        data: newProduct,
    });
};

let getProduct = async (req, res, next) => {
    let allProducts = await Product.find();
    res.status(200).json({
        error: false,
        data: allProducts,
        message: "Products Fetched successfully",
    });
};

let getSingleProduct = async (req, res, next) => {
    let { pid } = req.params;
    console.log(pid);

    let singleProduct = await Product.findOne({ id: pid });
    console.log(singleProduct);
    if (!singleProduct) {
        res.status(404).json({
            error: true,
            data: singleProduct,
            message: "Product Not Found",
            data: null,
        });
    }

    res.status(200).json({
        error: false,
        data: singleProduct,
        message: "Product found successfully",
    });
};

let deleteProduct = async (req, res) => {
    let { pid } = req.params;

    let isAvailable = await Product.find({ id: pid });
    if (!isAvailable) {
        res
            .status(404)
            .json({ error: true, message: `Product not found on given id ${pid}` });
    }
    let deletedProduct = await Product.findOneAndDelete({ id: pid });
    res.status(200).json({
        error: false,
        message: "Product deleted successfully",
        data: deletedProduct,
    });
};
const filterResult = async (req, res) => {
    let queryStrin = req.query;
    //page=1&pageSize=10&productName=apple&category=electronics
    console.log("queryStrin", queryStrin);
    //   const limit = 2;
    let page =
        queryStrin.page == null || queryStrin.page == undefined
            ? 1
            : queryStrin.page;
    let limit =
        queryStrin.pageSize == undefined || queryStrin.pageSize == null
            ? Number.MAX_SAFE_INTEGER
            : queryStrin.pageSize;
    console.log(limit);
    const productObj = {};
    if (queryStrin.productName) productObj.name = queryStrin.productName;
    if (queryStrin.category) productObj.category = queryStrin.category;

    let products = await Product.find(productObj)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
    console.log(products);
    res.status(201).send(products);
};

module.exports = {
    addProduct,
    getProduct,
    getSingleProduct,
    deleteProduct,
    filterResult,
};
