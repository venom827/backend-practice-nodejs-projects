const validate = require("../middleware/validate.js");
const {createUserSchema} = require("../validation/users.schema.js");
const db = require("../db/users-db.js")
const express = require("express");
const router = express.Router();


router.post(
    "/users",
    validate(createUserSchema),
    (req,res)=>{
       const {email,password,age}=req.body;
       db.run(
        `INSERT INTO users(email, password, age) VALUES (?, ?, ?)`,
        [email,password,age],
        function(err){
            if(err){
                return res.status(400).json({error:err.message});
            }
            res.json({
                ok:true,
                userID:this.lastID
            })
        }
       )
    }
)

router.get('/users',
    (req,res)=>{
        db.all(`SELECT * FROM users`, [], (err,rows)=>{
            if(err) {return res.status(400).json({error:err.message});}
            res.json(rows);
        });
    }
);
module.exports = router;
