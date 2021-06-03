
let n1 = 0, n2 = 1, nextTerm;
let s = 0;


for (let i = 1; n1 <= 4000000; i++) {
    if(n1 % 2 == 0){
      s += n1
    }
    nextTerm = n1 + n2;
    n1 = n2;
    n2 = nextTerm;
}

console.log(s);