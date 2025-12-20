const express = require("express");
const app = express();
const usersRouter = require("../routes/router.js");
app.use(express.json());
app.use(usersRouter);

app.listen(3000);