const validate = require("../middleware/validate.js");
const {createUserSchema,loginSchema} = require("../validation/users.schema.js");
const db = require("../db/users-db.js")
const express = require("express");
const router = express.Router();
const {signToken} = require("../utils/jwt.js");
const {hashPassword,verifyPassword} = require("../utils/password.js");
const {createUser,findUserByEmail} = require("../db/user.model.js");
const requireAuth = require("../middleware/auth.js")
const requireJwtAuth = require("../middleware/jwt-auth.js");
router.post('/signup', validate(createUserSchema) ,async (req,res,next)=>{
    try{
        const {email,password,age} = req.body;
        
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({error:"User already exists"});
        }

        const passwordHash = await hashPassword(password)
        const user = await createUser({email,passwordHash,age});
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

        req.session.userId = user.id;

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

router.post('/login-jwt',validate(loginSchema),async (req,res,next)=>{
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

        const token = signToken({userId:user.id});


        res.status(201).json({
            ok:true,
            token
        })
    }
    catch(err){
        next(err);
    }
    
})

router.get('/me',requireAuth,async (req,res,next)=>{
    try{
        res.json({UserId:req.session.id})
    }
    catch(err){
        next(err);
    }
})

router.get('/me-jwt',requireJwtAuth, async (req,res,next)=>{
    try{
        res.json({UserId:req.userId})
    }
    catch(err){
        next(err);
    }
})


router.post('/logout',(req,res,next)=>{
    req.session.destroy(err => {
        if (err) return next(err);

        res.clearCookie("connect.sid");
        res.json({ok:true});
    })
})

module.exports = router;