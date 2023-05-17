import mongoose from "mongoose";
import { envResult } from "../env";


export default async function dbConnect() {
    if(!envResult.success) {
        throw new Error("Environment variables are not set");
    }
    await mongoose.connect(envResult.data.MONGODB_URI)
}