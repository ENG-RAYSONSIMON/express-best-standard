const express = require("express");
const router = express.Router();

const controller = require("../controllers/task.controller");
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const {
    createTaskSchema,
    updateTaskSchema,
} = require("../schemas/task.schema");

router.post("/", auth, validate(createTaskSchema), controller.createTask);
router.get("/", auth, controller.getTasks);
router.get("/:id", auth, controller.getTaskById);
router.put("/:id", auth, validate(updateTaskSchema), controller.updateTask);
router.delete("/:id", auth, controller.deleteTask);
module.exports = router;
