const express = require("express");
const app = express();
const usersRouter = require("../routes/router.js");
const nextError = require("../middleware/error-handler.js")
const session = require("express-session")
app.use(express.json());
app.use(session({
    secret:"super-secret-key",  // later → env var
    resave:false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true
    }
}));
app.use(usersRouter);
app.use(nextError)

app.listen(3000);