const validate = require("../week4/middleware/validate.js");
const {createUserSchema} = require("../week4/validation/users.schema.js");
const {saveUsers,loadUsers} = require("../week4/users-db.js")
const express = require("express");
const router = express.Router();
let users = loadUsers();

router.post(
    "/users",
    validate(createUserSchema),
    (req,res)=>{
        users.push(req.body);
        saveUsers(users);
        res.json({ok:true,user:req.body,count:users.length})
    }
)
module.exports = router;
