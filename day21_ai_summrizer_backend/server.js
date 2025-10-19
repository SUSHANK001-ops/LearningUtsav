const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
connectDB();
const authRoutes = require("./routes/authRoutes");
const summeryRoutes = require("./routes/summeryRoutes");
const app = express();
const cors = require('cors');

// Allow requests from the Vite dev server (http://localhost:5173)
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Parse JSON and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/api", authRoutes);
app.use('/api', summeryRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
  console.log(err)
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
