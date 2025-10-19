const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
connectDB();
const authRoutes = require("./routes/authRoutes");
const summeryRoutes = require("./routes/summeryRoutes");
const app = express();
const cors = require('cors');

// Dynamic CORS allowlist from env (comma-separated)
const allowlist = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow non-browser requests (e.g., Postman) with no origin
    if (!origin) return callback(null, true);
    if (allowlist.includes(origin)) return callback(null, true);
    // Allow any Vercel frontend
    try {
      const url = new URL(origin);
      if (url.hostname.endsWith('.vercel.app')) {
        return callback(null, true);
      }
    } catch (_) {}
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Ensure caches vary by Origin and handle preflight
app.use((req, res, next) => {
  res.header('Vary', 'Origin');
  next();
});
app.use(cors(corsOptions));
// Generic OPTIONS handler compatible with Express 5 (no '*' path)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

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
