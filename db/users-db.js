const fs = require("fs");

function saveUsers(user){
    fs.writeFileSync("users.json",JSON.stringify(user));
}

function loadUsers(){
    if (!fs.existsSync("users.json")) return [];
    const data = fs.readFileSync("users.json","utf-8")
    if (!data.trim()) return [];
    return JSON.parse(data);
}

module.exports = {saveUsers,loadUsers}