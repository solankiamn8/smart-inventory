import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

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

// Method 1: Compare Password
userSchema.methods.comparePassword = async function (candidatePassword) {
    // this.password is the HASHED verison in the database
    // candidatePassword is the PLAIN text the user just typed
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

// Method 2: Create JWT
userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    )
}

export default mongoose.model("User", userSchema);