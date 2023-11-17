const mongoose = require('mongoose');

let productSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        category: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

module.exports = new mongoose.model("ProductsDetails", productSchema)

