import java.io.*;
import java.util.*;
interface AnonymousInterface
{
    void getCipher(ArrayList<String> list);
}

class Cipher_Anonymous
{
    void anonymousClass(ArrayList<String> list) 
    {
        //Enter your Code here
        AnonymousInterface obj = new AnonymousInterface(){
        
            @Override
            public void getCipher(ArrayList<String> list) {
                // TODO Auto-generated method stub
                for(String x:list){
                    System.out.print(x);
                }
                
            }
        };
        obj.getCipher(list);
    }
}

class Cipher_MethodRef
{
    void methodReference(ArrayList<String> list)        
    {
        //Enter your Code here
        AnonymousInterface obj = (list1) ->{
          list1.forEach(System.out::print);  
        };
        obj.getCipher(list);
    }
}

class Cipher_LambdaExp
{
    void lambdaExpression(ArrayList<String> list) 
    {
        //Enter your Code here
        AnonymousInterface obj = (list1) -> {
          for(int i=0;i<list1.size();i++){
              int ch = (int)list1.get(i).charAt(0);
              String req = list1.get(i).substring(1);
              list1.set(i,ch+req);
              if(list1.get(i).equals("32"))
                    list1.set(i,"#$");
              StringBuilder sb = new StringBuilder(list1.get(i));
              list1.set(i,sb.reverse().toString());
          }  
          for(String x:list1){
              System.out.print(x);
          }
        };
         obj.getCipher(list);
        
    }
}
public class CipherMain