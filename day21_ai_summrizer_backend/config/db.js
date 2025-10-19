const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const connectDB = async ()=>{
    try {
        // Remove quotes from the connection string in .env if present
        const mongoURL = process.env.MONGODB_URL.replace(/['"]/g, '');
        
        await mongoose.connect(mongoURL, {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000,           // Socket timeout
            family: 4,                        // Use IPv4, skip trying IPv6
        });
        
        console.log("DB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        // Don't exit process, let the app continue (server can run without DB for debugging)
        // process.exit(1); // Uncomment if you want to stop the app on DB failure
    }
}

module.exports = connectDB;