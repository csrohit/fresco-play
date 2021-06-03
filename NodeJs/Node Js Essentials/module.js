// app.js

const m = require('./module');
const readline = require('readline');

let r1 = readline.createInterface(process.stdin, process.stdout);
r1.question("first number", n1 =>{
  r1.question("second number", n2 =>{
    console.log(m.add(n1,n2));
    console.log(m.multiply(n1,n2));
  })
})


// module.js
module.exports.add = (a,b) => {
    return a+b;
}
module.exports.multiply = (a,b)=>{
    return a+b
}