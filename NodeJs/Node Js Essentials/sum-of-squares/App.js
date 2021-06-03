let sum = 0, sum_sq = 0;

for (let i = 1; i <= 100; i++){
  sum += i;
  sum_sq += i*i;
}

console.log(Math.abs(sum_sq - sum*sum))