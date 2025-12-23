const {verifyToken} = require("../utils/jwt.js");

function requireJwtAuth(req,res,next){
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error: "Missing token"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const payload = verifyToken(token);
        req.userId = payload.userId;
        next();
    }
    catch(err){
        return res.status(401).json({error:"Invalid or expired token"});
    }

}

module.exports = requireJwtAuth;