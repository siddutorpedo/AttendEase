import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error("❌ Error: MONGO_URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Handle database connection errors after initial connection
    mongoose.connection.on("error", (err) => {
      console.error(`❌ MongoDB runtime error: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected. Attempting to reconnect...");
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Ensure server exits on failure
  }
};

export default connectDB;
