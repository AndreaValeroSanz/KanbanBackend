import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    surname: String,
    surname2: String,
    email: String,
    password: String,
});

const User = mongoose.model("users", userSchema);

export default User;