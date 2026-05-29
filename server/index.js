const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const resumeRoutes = require("./routes/resumeRoutes");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.send("Server Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});