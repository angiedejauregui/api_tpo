const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.js");

const usersRoutes = require("./routes/users.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const classRoutes = require("./routes/classes.routes");
const bookingsRoutes = require("./routes/bookings.routes.js");
const reviewsRoutes = require("./routes/reviews.routes.js");
const notificationRoutes = require("./routes/notifications.routes.js");
const statsRoutes = require("./routes/stats.routes.js");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json()); 
app.use(cors());

app.use("/images", express.static("images"));
app.use("/api/v1/users", usersRoutes);
app.use("/auths", authRoutes);
app.use("/api/v1/services", classRoutes);
app.use("/api/v1/bookings", bookingsRoutes);
app.use("/api/v1/reviews", reviewsRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/stats", statsRoutes);



app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
});

