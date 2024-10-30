import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: String,
    name: String,
    surname: String,
    surname2: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

export default User;