const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "super-seecret-key" ; // later → env var
const JWT_EXPIRY = "1h";

function signToken(payload){
    return jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn: JWT_EXPIRY
    });
}

function verifyToken(token){
    return jwt.verify(token,JWT_SECRET_KEY);
}

module.exports = {signToken,verifyToken};