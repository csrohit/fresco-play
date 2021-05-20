import java.io.*;
import java.util.*;
class Register {
    
    private static Register register = null;
    private static Map<String, Double> items =  new HashMap<>();
    /*
     * Complete the 'getTotalBill' function below.
     *
     * The function is expected to return a STRING.
     * The function accepts MAP itemDetails as parameter.
     */

    public String getTotalBill(Map<String,Integer> itemDetails) {
        Double bill = 0.0;
        for(Map.Entry<String, Integer> entry: itemDetails.entrySet()){
            if(items.containsKey(entry.getKey())){
                bill += entry.getValue() * items.get(entry.getKey());
            }
        }
        return bill.toString();

    }
    
    public static Register getInstance(){
        if(register == null){
            register = new Register();
            items.put("apple", 2.0);
            items.put("orange", 1.5);
            items.put("mango", 1.2);
            items.put("grape", 1.0);
        }
        return register;
    }

}

public class Solution {
    public static void main(String[] args) throws IOException {
        
        Scanner readInput = new Scanner(System.in);        
        String[] input=readInput.nextLine().split(" ");                
        Map<String,Integer> myItems=new HashMap<String,Integer>();
        for(int i=0;i<input.length;i+=2){
          myItems.put(input[i],Integer.parseInt(input[i+1]));	
        }
        Register regObj = Register.getInstance();        
        System.out.println(regObj.getTotalBill(myItems));
        readInput.close();
        
    }
}