const express = require("express");
const app = express();
const usersRouter = require("../routes/router.js");
const nextError = require("../middleware/error-handler.js")
app.use(express.json());
app.use(usersRouter);
app.use(nextError)
app.listen(3000);