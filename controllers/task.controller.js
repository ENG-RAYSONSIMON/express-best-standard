const Task = require("../models/task.model");
const asyncHandler = require("../middlewares/asyncHandler");

exports.createTask = asyncHandler(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json(task);
});

exports.getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
});

exports.getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json(task);
});

exports.updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json(task);
});

exports.deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({ message: "Task deleted" });
});