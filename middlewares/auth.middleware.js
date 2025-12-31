const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = header.split(" ")[1];

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET
        );
        req.user = payload;
        next();
    } catch {
        res.status(401).json({ message: "Token expired or invalid" });
    }
};
