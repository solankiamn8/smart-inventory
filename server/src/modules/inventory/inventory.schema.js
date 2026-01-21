import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",    // links to the User Model
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        default: "Uncategorized"
    },
    brand: {
        type: String,
    },
    minStockLevel: {
        type: Number,
        default: 10,    // Warn if stock drops below 10
    }
}, { timestamps: true });

// prevents duplicate names for the same user
inventorySchema.index({ user: 1, name: 1 }, { unique: true });

export default mongoose.model("Inventory", inventorySchema);