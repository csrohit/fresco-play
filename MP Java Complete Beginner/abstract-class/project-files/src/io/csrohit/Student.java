package io.csrohit;

abstract public class Student {
    abstract public String result(String marks);

    protected double getGrade(int a, int b, double x, double y, int score){
        return (y-x)*(score - a)/(b-a) + x;
    }
    protected double getTotalGrade(int score){
        double grade = 0;
        if (score < 40){
            grade = 0;
        }else if(score <= 49){
            grade = this.getGrade(40,49,6.0,6.9,score);
        }else if (score <=59){
            grade = this.getGrade(50,59,7.0,7.9,score);
        }else if (score <= 74){
            grade = this.getGrade(60,74,8.0,8.9,score);
        }else if (score <= 100){
            grade = this.getGrade(75, 100, 9.0, 10.0, score);
        }
        double tmp = grade * 10;
        return ((int) tmp)/10.0;
    }
}
