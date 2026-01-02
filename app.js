const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/task.routes");
const authRoutes = require("./routes/auth.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());
// Allow CORS from your frontend
app.use(
    cors({
        origin: "http://localhost:5173", // frontend origin
        credentials: true, // if you send cookies (optional)
    })
);

app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/auth", authRoutes);

app.use(errorMiddleware);

module.exports = app;
