import mongoose from 'mongoose';

const MONGO_URI = "mongodb+srv://avalerosanz:root@cluster0.oqdti.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(MONGO_URI, {

        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export {connectDB};