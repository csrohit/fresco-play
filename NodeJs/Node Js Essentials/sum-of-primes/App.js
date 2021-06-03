const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num > 1;
}
let sum = 0;


for(let i=2; i < 2000000; i++){
  if(isPrime(i)){
    sum += i;
  }
} 

console.log(sum)











