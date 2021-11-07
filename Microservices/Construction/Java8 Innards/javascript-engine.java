import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import javax.script.Bindings;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
class Nashorn {
public static int averageCost(int noOfMonths ,int [] travelCostForMonths)
            throws ScriptException {
        //Write your code here
        ScriptEngineManager scriptEngineManager = new ScriptEngineManager();
        ScriptEngine nashorn = scriptEngineManager.getEngineByName("nashorn");
        Integer res = 0;
        for(int i: travelCostForMonths){
            res+=i;
        }
        Integer eval = (Integer) nashorn.eval("");   
    return Math.round((float)res/noOfMonths);
    }
}
public class JavaScriptEngine {
	public static void main(String[] args) throws IOException, ScriptException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int noOfMonths = Integer.parseInt(br.readLine().trim());
		int [] travelCostForMonths = new int [noOfMonths];
		for(int i=0; i<noOfMonths; i++)
		{
			travelCostForMonths[i] = Integer.parseInt(br.readLine().trim());
		}
		int result = Nashorn.averageCost(noOfMonths, travelCostForMonths);
		System.out.println(result);
	}
}
