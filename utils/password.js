const bcrypt = require("bcrypt");

const  SALT_ROUDS = 10;
async function hashPassword(plainPassword){
    return bcrypt.hash(plainPassword, SALT_ROUDS);
}

async function verifyPassword(plainPassword, hashedPassword){
    return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {hashPassword,verifyPassword};