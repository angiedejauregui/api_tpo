const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.js");

const usersRoutes = require("./routes/users.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const classRoutes = require("./routes/classes.routes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json()); 
app.use(cors());

app.use("/api/v1/users", usersRoutes);
app.use("/auths", authRoutes);
app.use("/api/v1/services", classRoutes);

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
});

