const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db.js");

const usersRoutes = require("./routes/users.routes.js");
const authRoutes = require("./routes/auth.routes.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 

app.use(cors());
dotenv.config();

app.use(usersRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

