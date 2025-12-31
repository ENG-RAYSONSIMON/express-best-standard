const User = require("../models/user.model");
const asyncHandler = require("../middlewares/asyncHandler");
const { hashPassword, comparePassword } = require("../utils/hash");
const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
} = require("../utils/jwt");
const crypto = require("crypto");

exports.register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
        const err = new Error("User already exists");
        err.statusCode = 409;
        throw err;
    }

    const user = await User.create({
        email,
        password: await hashPassword(password),
    });

    res.status(201).json({ message: "User created" });
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await comparePassword(password, user.password))) {
        const err = new Error("Invalid credentials");
        err.statusCode = 401;
        throw err;
    }

    const accessToken = signAccessToken({ userId: user._id });
    const refreshToken = signRefreshToken({ userId: user._id });

    user.refreshToken = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    await user.save();

    res.status(200).json({ accessToken, refreshToken });
});

exports.refresh = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        const err = new Error("Refresh token required");
        err.statusCode = 401;
        throw err;
    }

    const payload = verifyRefreshToken(refreshToken);
    const hashed = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    const user = await User.findById(payload.userId).select("+refreshToken");
    if (!user || user.refreshToken !== hashed) {
        const err = new Error("Invalid refresh token");
        err.statusCode = 403;
        throw err;
    }

    const newAccessToken = signAccessToken({ userId: user._id });
    res.status(200).json({ accessToken: newAccessToken });
});

exports.logout = asyncHandler(async (req, res) => {
    const { userId } = req.user;
    await User.findByIdAndUpdate(userId, { refreshToken: null });
    res.status(200).json({ message: "Logged out" });
});