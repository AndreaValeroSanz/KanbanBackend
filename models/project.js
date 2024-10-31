import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
    title: String, // Project title
    color: String // Hex color code for the project
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
