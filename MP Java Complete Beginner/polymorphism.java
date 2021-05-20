import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;
import java.util.stream.Collectors;

public class Solution {
    public static void main(String args[] ) throws Exception {
         Scanner readInput = new Scanner(System.in);
        int start = readInput.nextInt();
        int end = readInput.nextInt();
        ChildOne c1 = new ChildOne(start, end);
        System.out.println(c1.filter());

        ChildTwo c2 = new ChildTwo(start, end);
        System.out.println(c2.filter());
    }
}




class Parent{
    public int startELement;
    public int endElement;

    public Parent(int startELement, int endElement) {
        this.startELement = startELement;
        this.endElement = endElement;
    }

    public String filter(){
        return null;
    }
}

class ChildOne extends Parent{
    public ChildOne(int startELement, int endElement) {
        super(startELement, endElement);
    }

    @Override
    public String filter(){
        List<Integer> primes = new ArrayList<>();
        for(int i = this.startELement; i <= this.endElement; i++){
            if (this.isPrime(i)) primes.add(i);
        }
        return primes.stream().map(i->i.toString()).collect(Collectors.joining(" "));
    }

    private boolean isPrime(int n){
        if(n < 2) return false;
        int i = 2;
        while (i <= n / 2) {
            if (n % i == 0) {
                return false;
            }
            ++i;
        }
        return true;
    }
}

class ChildTwo extends Parent{

private List<Integer> happyNumbers = new ArrayList<>();
    public ChildTwo(int startElement, int endElement) {
        super(startElement, endElement);
    }

    @Override
    public String filter() {

        for(int i=this.startELement; i<=this.endElement; i++){
            if (isHappynumber(i)){
                happyNumbers.add(i);
            }


        }
        return happyNumbers.stream().map(i->i.toString()).collect(Collectors.joining(" "));
    }

    static boolean isHappynumber(int n)
    {
        int slow, fast;

        //  initialize slow and fast by n
        slow = fast = n;
        do
        {
            //  move slow number
            // by one iteration
            slow = numSquareSum(slow);

            //  move fast number
            // by two iteration
            fast = numSquareSum(numSquareSum(fast));

        }
        while (slow != fast);

        //  if both number meet at 1,
        // then return true
        return (slow == 1);
    }

    static int numSquareSum(int n)
    {
        int squareSum = 0;
        while (n!= 0)
        {
            squareSum += (n % 10) * (n % 10);
            n /= 10;
        }
        return squareSum;
    }
}