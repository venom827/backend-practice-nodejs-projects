const validate = require("../middleware/validate.js");
const {createUserSchema,loginSchema} = require("../validation/users.schema.js");
const db = require("../db/users-db.js")
const express = require("express");
const router = express.Router();
const {hashPassword,verifyPassword} = require("../utils/password.js");
const {createUser,findUserByEmail} = require("../db/user.model.js");

router.post('/signup', validate(createUserSchema) ,async (req,res,next)=>{
    try{
        const {email,password,age} = req.body;
        
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({error:"User already exists"});
        }

        const passwordHash = await hashPassword(password)
        const user = await createUser({email,age});
        res.status(201).json({ok:true,user})

    }
    catch(err){
        next(err);
    }
})

router.post('/login',validate(loginSchema),async (req,res,next)=>{
    try{    
        const {email,password} = req.body;
        const user = await findUserByEmail(email);
        if (!user){
            return res.status(401).json({error:"Invalid email or password"});
        }
        const passwordMatch = verifyPassword(password,user.password);
        if (!passwordMatch){
            return res.status(401).json({error:"Invalid email or password"});
        }
        res.status(201).json({
            ok:true,
            id: user.id,
            email: user.email,
            age: user.age
        })
    }
    catch(err){
        next(err);
    }
    
})

module.exports = router;
