const z = require("zod");

const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    age: z.number().int().min(8),
})

module.exports = {createUserSchema};