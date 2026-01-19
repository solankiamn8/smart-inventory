import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "staff"],
        default: "staff"
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    // don't rehash a hash
    if (!this.isModified("password")) return next();

    // hash password after salt generation
    this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("User", userSchema);