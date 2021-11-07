import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

//Write your code for repeatable annotations here
   @Retention (RetentionPolicy.RUNTIME)
   @Repeatable (states.class)
   @interface Capital{
       String state();
       String stateCapital();
   }
   @Retention (RetentionPolicy.RUNTIME)
   
   @interface states{
       Capital[] value();
   }
   @Capital(state = "Tamil Nadu", stateCapital = "Chennai")
   @Capital(state = "Kerala", stateCapital = "Thiruvananthapuram")
   @Capital(state = "Andhra Pradesh", stateCapital = "Amaravati")
   @Capital(state = "Telangana", stateCapital = "Hyderabad")
   @Capital(state = "Karnataka", stateCapital = "Bangalore")
   @Capital(state = "Maharashtra", stateCapital = "Mumbai")
   @Capital(state = "Manipur", stateCapital = "Imphal")
   @Capital(state = "Rajasthan",stateCapital = "Jaipur")
   @Capital(state = "Arunachal Pradesh", stateCapital = "Itanagar")
   @Capital(state = "Assam", stateCapital = "Dispur")
   @Capital(state = "Bihar", stateCapital = "Patna")
   @Capital(state = "Himachal Pradesh", stateCapital = "Shimla")
   @Capital(state = "Haryana", stateCapital = "Chandigarh")
   @Capital(state = "Gujarat", stateCapital = "Gandhinagar")
   @Capital(state = "Madhya Pradesh", stateCapital = "Bhopal")
   @Capital(state = "Meghalaya",stateCapital = "Shillong")
   @Capital(state = "Mizoram",stateCapital = "Aizawl")
   @Capital(state = "Jharkhand",stateCapital = "Ranchi")
   @Capital(state = "Nagaland", stateCapital = "Kohima")
   @Capital(state = "Odisha", stateCapital = "Bhubaneswar")
public class RepeatableAnnotation {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int input = Integer.parseInt(br.readLine().trim());
		br.close();
		Capital[] states = RepeatableAnnotation.class.getAnnotationsByType(Capital.class);
		if (input == 1) {
			for (int i = 0; i < 4; i++) {
				System.out.println(states[i].state() + "  -  " + states[i].stateCapital());
			}
		}
		if (input == 2) {
			for (int i = 4; i < 8; i++) {
				System.out.println(states[i].state() + "  -  " + states[i].stateCapital());
			}
		}
		if (input == 3) {
			for (int i = 8; i < 12; i++) {
				System.out.println(states[i].state() + "  -  " + states[i].stateCapital());
			}
		}
		if (input == 4) {
			for (int i = 12; i < 16; i++) {
				System.out.println(states[i].state() + "  -  " + states[i].stateCapital());
			}
		}
		if (input == 5) {
			for (int i = 16; i < 20; i++) {
				System.out.println(states[i].state() + "  -  " + states[i].stateCapital());
			}
		}

	}
}