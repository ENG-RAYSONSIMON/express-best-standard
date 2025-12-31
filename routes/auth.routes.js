const router = require("express").Router();
const validate = require("../middlewares/validate.middleware");
const controller = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");
const {
    registerSchema,
    loginSchema,
} = require("../schemas/auth.schema");

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);
router.post("/refresh", controller.refresh);
router.post("/logout", auth, controller.logout);

module.exports = router;
