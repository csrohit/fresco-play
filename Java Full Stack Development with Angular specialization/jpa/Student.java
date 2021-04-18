package frescojpa;

import javax.persistence.Id;
import java.io.Serializable;

public class Student implements Serializable {

    @Id
    private int id;
    private int studentRollNumber;
    private String studentName;

    public Student(int studentRollNumber, String studentName) {
        this.studentRollNumber = studentRollNumber;
        this.studentName = studentName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getStudentRollNumber() {
        return studentRollNumber;
    }

    public void setStudentRollNumber(int studentRollNumber) {
        this.studentRollNumber = studentRollNumber;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
}