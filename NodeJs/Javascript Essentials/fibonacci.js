process.stdin.resume();
process.stdin.setEncoding('utf-8');

var __input_stdin = "";
var __input_stdin_array = "";
var __input_currentline = 0;

process.stdin.on('data', function(data) {
    __input_stdin += data;
});


/*
 * Complete the function below.
 */
function fibonacciSequence(input) {
    let n1 = 0, n2 = 1, nextTerm;
    let re = [0]

for (let i = 1; i <= input; i++) {
    nextTerm = n1 + n2;
    n1 = n2;
    n2 = nextTerm;
    
    re.push(n1);
}
return re;
}

var fs = require('fs');