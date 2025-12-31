const express = require("express");
const taskRoutes = require("./routes/task.routes");
const authRoutes = require("./routes/auth.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/auth", authRoutes);

app.use(errorMiddleware);

module.exports = app;
