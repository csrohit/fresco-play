import java.io.*;
import java.util.*;
class Candidates
{
    //Create the Constructor here
    //Check Sample Case for more understanding
    String name;
    String locality;
    int age;
    public Candidates(String name,String locality,int age){
        this.name = name;
        this.locality = locality;
        this.age = age;
    }
    
}

class Interview_Candidates
{
    boolean areNatives(ArrayList<Candidates> candidatesList)
    {
        //Enter your Code here
        int res = (int)candidatesList.stream().filter((c) -> 
        c.locality.equals("Native")).count();
        return res == candidatesList.size();
        
    }
    
    Candidates youngestCandidate(ArrayList<Candidates> candidatesList)
    {
        //Enter your Code here
        Collections.sort(candidatesList,(o1,o2) -> o1.age - o2.age);
        return candidatesList.get(0);
        
    }
}

public class Interview_CandidatesMain
{
    public static void main(String[] args) throws Exception
    {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
		ArrayList<Candidates> candidatesList=new ArrayList<>();
				
		 int n=Integer.parseInt(br.readLine().trim());
		 
		 for(int i=0;i<n;i++)
		 {
			 String inp=br.readLine();
	         String inparr[]=inp.split("-");
	         
	         Candidates cnd=new Candidates( inparr[0], inparr[1], Integer.parseInt(inparr[2]) );
	         candidatesList.add(cnd);         
		 }
		 
		 
		 Interview_Candidates ic=new Interview_Candidates();
		 
		 boolean ans= ic.areNatives(candidatesList);
		 if(ans)
			  	System.out.println("All candidates are Natives");
		 else
				System.out.println("All candidates are not Natives");
		 
		 
		  Candidates youngest=ic.youngestCandidate(candidatesList);
        
		  System.out.println("Details of the Candidate with youngest age : Name = "+youngest.name+", Locality = "+youngest.locality+", Age = "+youngest.age);
    }
}
