class Result {

    /*
     * Complete the 'calculateGrade' function below.
     *
     * The function is expected to return a STRING_ARRAY.
     * The function accepts 2D_INTEGER_ARRAY students_marks as parameter.
     */

    public static String[] calculateGrade(int[][] students_marks) {
        List<String> grades = new ArrayList<>();
        for(int marks[]: students_marks){
            int s = 0;
            for(int mark: marks){
                s += mark;
            }
            s = s/marks.length;
            if(s >= 90){
                grades.add("A+");
            }else if(s >= 80){
                grades.add("A");
            }else if(s >= 70){
                grades.add("B");
            }else if(s >= 60){
                grades.add("C");
            }else if(s >= 50){
                grades.add("D");
            }else {
                grades.add("F");
            }
        }
        
        String[] gradesArray = new String[students_marks.length];
        
        return grades.toArray(gradesArray);
    }

}