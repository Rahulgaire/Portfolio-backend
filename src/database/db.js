import mongoose from "mongoose"
import dotenv from "dotenv"


dotenv.config()

export const connectDb = async (req,res) => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log(`Database Connected Successfully`)
    } catch (error) {
        console.log(`Error connecting Database : ${error}`)
    }
}