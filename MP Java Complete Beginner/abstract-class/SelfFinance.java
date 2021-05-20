
import java.util.Arrays;

public class SelfFinance extends Student{

    @Override
    public String result(String marks) {
        String marksArr[] = marks.split("\\|");
        String subjectMarks[] = marksArr[0].split(",");
        Integer nccMarks[] = Arrays.stream(marksArr[1].split(",")).map(i -> Integer.parseInt(i)).toArray(size -> new Integer[size]);

        Integer indSubMarks[][] = new Integer[subjectMarks.length][];
        for (int i=0; i < subjectMarks.length; i++){
            indSubMarks[i] = Arrays.stream(subjectMarks[i].split(" ")).map(j -> Integer.parseInt(j)).toArray(size -> new Integer[size]);
        }

        int creditMax = 0;
        // subject marks
        creditMax += subjectMarks.length * 5;

        if (nccMarks[0] == 1){
            creditMax += 5;
        }


        double product = 0.0;
        // calculate grades per subject
        for (Integer subject[]: indSubMarks){
            int score = subject[0];
            int credit = subject[1];
            double grade = this.getTotalGrade(score);
            product += grade * credit;
        }

        //check for ncc score
        if (nccMarks[0] == 1){
            product += nccMarks[2] * this.getTotalGrade(nccMarks[1]);
        }

        double res = product/creditMax;
        return String.format("%.2f", res);
    }

}
