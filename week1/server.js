const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("Request received");

  // ✅ NON-BLOCKING I/O
  fs.readFile(__filename, () => {
    res.end("Done");
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
