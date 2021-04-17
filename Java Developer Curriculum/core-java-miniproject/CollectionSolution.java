package solution;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;


public class CollectionSolution {
    public static void solution() throws Exception{
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(reader.readLine());
        Map<String, String> map = new HashMap<>();
        for (int i=0; i<n; i++){
            String line = reader.readLine();
            int divide = line.indexOf(" ");
            String key = line.substring(0, divide);
            String value = line.substring(divide+1, line.length());
            map.put(key, value);
        }
        String key = reader.readLine();
        if(map.containsKey(key)){
            System.out.println(map.get(key));
        }else{
            System.out.println(-1);
        }
    }
}
