import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50
    },    
    description: {
        type: String,
        required: true,
        maxLength: 250
    },    
    category: {
        type: String,
        required: true,
        maxLength: 30
    },    
    price: {
        type: Number,
        required: true
    },    
    url: {
        type: String,
        required: true,
        maxLength: 30,
        unique: true
    },    
    pic: {
        type: String,
        required: true
    },
    extras: {
        type: [
            {
                text: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
})

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);