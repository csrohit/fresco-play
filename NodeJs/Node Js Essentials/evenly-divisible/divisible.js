function gcd(a, b)
{
   if(a%b != 0)
      return gcd(b,a%b);
   else
      return b;
}
   
// Function returns the lcm of first n numbers
function lcm(n)
{
    let ans = 1;   
    for (let i = 1; i <= n; i++)
        ans = (ans * i)/(gcd(ans, i));
    return ans;
}
       
// function call
     
    let n = 20;
    console.log(lcm(n));