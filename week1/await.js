function wait(ms){
    return new Promise(resolve =>(setTimeout(resolve,ms)))
}
const promises = [];

for (let i = 0; i < 3; i++) {
  promises.push(
    wait(1000).then(() => console.log(i))
  );
}

await Promise.all(promises);