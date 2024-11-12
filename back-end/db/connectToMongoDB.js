import mongoose from "mongoose";

const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("DB connected")
    } catch(err) {
        console.log("Error connecting", err.message);
        
    }
}

export default connectToMongoDb;