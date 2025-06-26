const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URI); // Debug
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Error ❌:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;