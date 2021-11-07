import java.io.*;
import java.util.*;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import java.util.function.Consumer; 
import java.util.function.Supplier;

class StoreElementsInCollection
{
    static void storeElements(String input)
    {
        //Enter your Code here
        List<String> res = new ArrayList<String>();
        Consumer<String> rest = (str) ->
        {
            String rest1[] = str.split(",");
            for(int i=0;i<rest1.length;i++)
            {
                // All should be in lowercase in equal.
                if(rest1[i].equals("cheese sandwich") || rest1[i].equals("corn sandwich")|| rest1[i].equals("mix veg sandwich")){
                    res.add(i,rest1[i]);
                    }
                    else
                    {
                        System.out.println("Incorrect Input");
                        return;
                    }
            }
            res.forEach((x) -> System.out.println(x));
        };
        Supplier<List<String>> supplier = ()-> res;
        rest.accept(input);
    }
}

public class StoreElementsInCollectionMain