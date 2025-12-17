const fs = require("fs");

console.log("A");

setTimeout(() => {
  console.log("B - timeout");
}, 0);

fs.readFile(__filename, () => {
  console.log("C - file read");
});

Promise.resolve().then(() => {
  console.log("D - promise");
});

console.log("E");

/*Prediction
A
B - timeout
C - file read
D - promise
E
*/

/*
Actual output
A
E
D - promise
B - timeout
C - file read
*/

/*
Explanation
Welp shit, way off
kinda missed AE being synchronous so thats on me
but i dont get about other guys
isnt node event cycle 

Timers → setTimeout, setInterval

I/O callbacks → file/network I/O

Poll → wait for I/O

Check → setImmediate

Close callbacks

Microtasks → Promises, await, process.nextTick
Thats why i thought this would be it 
other than well AE silly mistake on my part
*/