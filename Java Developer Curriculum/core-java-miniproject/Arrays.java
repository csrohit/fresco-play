package solution;

public class Arrays {

    public static void frequency(int n) {
        int[] res = {0,0,0,0,0,0,0,0,0,0};
        String str = Integer.toString(n);
        for(char c: str.toCharArray()){
            int a = Character.getNumericValue(c);
            res[a]++;
        }
    for (int i=0; i < res.length; i++){
        if(res[i] != 0){
            System.out.printf("%d: %d\n", i, res[i]);
        }
    }
    }

}
