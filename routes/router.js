const validate = require("../middleware/validate.js");
const {createUserSchema} = require("../validation/users.schema.js");
const {saveUsers,loadUsers} = require("../db/users-db.js")
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
