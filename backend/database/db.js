import mongoose  from "mongoose"

export const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log("connected DB ");  
    } catch (error) {
        console.log("connection is failed", error.message)
        process.exit(1);
    }
}