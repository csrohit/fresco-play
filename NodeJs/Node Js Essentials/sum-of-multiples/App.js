var sum = 0;
var number = 1000;
for (var i = 0; i < number; i++) {
    if (i % 3 == 0 || i % 5 == 0) {
        sum += i;
    }
}

console.log(sum);