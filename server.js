require("dotenv").config(); // ✅ Make sure this is FIRST

const express = require("express");
const cors = require("cors"); // ✅ Import cors
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const chatRoute = require('./routes/chat');

connectDB(); // ✅ Connect to MongoDB

const app = express();

// ✅ Use CORS before routes
app.use(cors({
  origin: "http://localhost:3000", // ✅ Allow only frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // Optional, if you use cookies or sessions
}));

app.use(express.json());

// ✅ Routes
app.use('/api/chat', chatRoute);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
