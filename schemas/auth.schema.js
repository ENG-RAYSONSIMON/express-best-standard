const { z } = require("zod");

exports.registerSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
    }),
});

exports.loginSchema = exports.registerSchema;
