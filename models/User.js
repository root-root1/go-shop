import mongoose from "mongoose";
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
}, {
    timestamps: true
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`);
}

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
