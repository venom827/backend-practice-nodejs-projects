const express = require("express");
const app = express();
const usersRouter = require("../week4/router.js")
console.log(express.json)
app.use(express.json());
app.use(usersRouter);

app.listen(3000);