function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function test() {
  console.log("Start");
  await wait(1000);
  console.log("After 1s");
}

test();
console.log("End");

/*Prediction
Start
End
After 1s
*/

/*Actual output
Start
End
After 1s
*/

/*
Explanation
This happens:
demo is called
goes to function definition
console logs Start
wait() returns unresolved promise => unresolved promise is handed to times system
await encounters promise so turns rest of the code in async after it as part of .then() calls
an schedules a microtask queue for each here just for console logging B
then synchronously End is console logged
finally call stack is completely empty so now microtask queue tasks are put onto call stack
After 1s is console logged
*/