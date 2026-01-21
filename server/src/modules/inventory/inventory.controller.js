import mongoose from "mongoose";
import Inventory from "./inventory.schema.js"

export const createInventory = async (req, res) => {
    try {
        const { userId: user } = req.user;
        const { name, quantity, price } = req.body;

        if (!name || quantity === undefined || !price) {
            return res.status(400).json({ message: "Missing Values" });
        }

        const newInventory = new Inventory({
            name,
            quantity,
            price,
            user
        });

        await newInventory.save();

        res.status(201).json({ message: "Inventory Created" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getInventory = async (req, res) => {
    try {
        const { userId } = req.user;

        const items = await Inventory.find({ user: userId });

        res.status(200).json(items);

    } catch (error) {
        console.errror(error);
        return res.status(500).json({ message: "Server Error", error: error.message })
    }
};

export const updateInventory = async (req, res) => {
    try {
        const { userId } = req.user;
        const id = req.params.id;

        // Input Validation
        if (!id) return res.status(400).json({ message: "Missing ID parameter" });
        if (!req.body) return res.status(400).json({ message: "Missing request body" });

        const { quantity } = req.body;

        // Prevent negative stock (business logic)
        if (quantity !== undefined && quantity < 0) {
            return res.status(400).json({ message: "Quantity cannot be negative" });
        }

        // Database lookup & Authorization
        // findOne ensures that the user owns the item they are trying to update
        const item = await Inventory.findOne({ _id: id, user: userId });

        if (!item) {
            return res.status(404).json({ message: "Item Not Found" });
        }

        // Dynamic Update (Safe Loop)
        const restrictedFields = ["_id", "user", "createdAt", "updatedAt"];

        Object.keys(req.body).forEach(key => {
            if (!restrictedFields.includes(key)) {
                item[key] = req.body[key]
            }
        });

        await item.save();

        res.status(200).json({ message: "Updated Successfully" })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const deleteInventory = async (req, res) => {
    try {
        const { userId } = req.user;
        const id = req.params.id;

        // Input Validation
        if (!id) return res.status(400).json({ message: "Missing ID parameter" });

        // Database lookup & Authorization
        // findOne ensures that the user owns the item they are trying to delete
        const deletedItem = await Inventory.findOneAndDelete({ _id: id, user: userId });

        if(!deletedItem){
            return res.status(404).json({message: "Item Not Found"});
        }else{
            return res.status(200).json({message: "Deleted Successfully"})
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}