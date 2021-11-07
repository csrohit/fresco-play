import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

class Solution 
{
public static String manipulation(String stringInputDate, int days, int months, int years) {
        //Write your code here
        DateTimeFormatter df = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate localDate = LocalDate.parse(stringInputDate,df);
        LocalDate newd = localDate.plusDays(days).plusMonths(months).plusYears(years);
        String date = df.format(newd);
        return date;
        
    }
}

public class DateManipulation {

	public static void main(String [] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String stringInputDate = br.readLine();
		int days = Integer.parseInt(br.readLine().trim());
		int months = Integer.parseInt(br.readLine().trim());
		int years = Integer.parseInt(br.readLine().trim());
		br.close();
		String result = Solution.manipulation(stringInputDate, days, months, years);
		System.out.println(result);
	}
}