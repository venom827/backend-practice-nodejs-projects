console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");
/*
Prediction
A
D
B
C
*/ 

/*
Actual output
A
D
C
B
*/

/*My explanation
I think console log ones happened firat surely bcz they were the firs to execute in the event loop
I forgot the name but it might've been heap
basically heap and callback i think 
console log tasks executed in heap first as they were synchronously there
async code for B and C got sent to callback(?) and it was essentially egregated in macro and microtasks queue
and i believe micro task queue executes first maybe.
*/

