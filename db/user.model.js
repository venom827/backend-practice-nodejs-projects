const db = require("./users-db.js")

function createUser({email,passwordHash,age}){
    return new Promise((resolve,reject)=>{
        db.run(
            `INSERT INTO users(email,password,age) VALUES (?,?,?)`,
            [email,passwordHash,age],
            function(err){
                if (err) return reject(err);
                resolve({
                    id:this.lastID,
                    email,
                    passwordHash,
                    age
                });
            }
        )
    })
}

function findUserByEmail(email){
    return new Promise((resolve,reject)=>{
        db.get(
            `SELECT * FROM users WHERE email = ?`,[email],(err,row)=>{
                if (err) reject(err);
                resolve(row);
            })
    })
}



module.exports = {createUser,findUserByEmail};