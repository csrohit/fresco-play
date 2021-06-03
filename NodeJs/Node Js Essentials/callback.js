let sum=0;
for(let i=3; i<=1000; i++){
    if(i%3==0){
        sum += i
    }
    if(i%5==0){
        sum+=i
    }
}
setTimeout(()=>console.log(sum), 1000);