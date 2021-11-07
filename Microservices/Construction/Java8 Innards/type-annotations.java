import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.annotation.ElementType;
import java.lang.annotation.Target;
import java.util.ArrayList;

class Hospital {
       //Write your code for annotations here
       // @interface is used to create custom Annotations 
       // @Target is applicable to only methods and classes. 
       
       @Target(ElementType.PARAMETER)
       public @interface NonNull{
           
       }
       @Target(ElementType.PARAMETER)
       public @interface NonNegative{
           
       }

public static String[] addPatientsDetails(@NonNegative String[] input, @NonNull int n, @NonNegative String detailsToBeAdded) {
       
       //Write your code here
       String[] res = new String[n+1];
       for(int i=0;i<n;i++){
           res[i] = input[i];
       }
       res[n] = detailsToBeAdded;
       return res;       
    }
public static String[] removePatientsDetails(@NonNegative String[] input,@NonNull int n,@NonNegative String  patientIdToRemove) {
    
       //Write your code here
       ArrayList<String> al = new ArrayList<>();
       for(int i= 0;i<n;i++){
           String[] temp = input[i].split(" ");
           if(!temp[0].equals(patientIdToRemove))
             al.add(input[i]);
       }
       return al.toArray(new String[0]);
       
    }
public static String[] updatePatientsDetails(@NonNegative String[] input,@NonNull int n,@NonNegative String patientIdToUpdate,@NonNegative String patientDetailsToUpdate) {
       //Write your code here
       for(int i=0;i<n;i++){
           String[] temp = input[i].split(" ");
           if(temp[0].equals(patientIdToUpdate))
                input[i] = patientDetailsToUpdate;
       }
       return input;
    }  
}

public class TypeAnnotation {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine().trim());
		String input[] = new String[n];
		for (int i = 0; i < n; i++) {
			input[i] = br.readLine();
		}
		int query = Integer.parseInt(br.readLine().trim());
        if (query == 1) {			
			String detailsToBeAdded = br.readLine();
			String[] result1 = Hospital.addPatientsDetails(input, n, detailsToBeAdded);
			for (int i = 0; i < (n+1); i++) {
				System.out.println(result1[i]);
			}
		}
		if (query == 2) {
			String patientIdToRemove = br.readLine();
			String[] result2 = Hospital.removePatientsDetails(input, n, patientIdToRemove);
			for (int i = 0; i < (n-1); i++) {
				System.out.println(result2[i]);
			}
		}
		if (query == 3) {
			String patientIdToUpdate = br.readLine();
			String patientDetailsToUpdate = br.readLine();
			String[] result3 = Hospital.updatePatientsDetails(input, n, patientIdToUpdate, patientDetailsToUpdate);
			for (int i = 0; i < n ; i++) {
				System.out.println(result3[i]);
			}
		}
		br.close();
	}
}