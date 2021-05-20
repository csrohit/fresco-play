package io.csrohit;

import java.io.*;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        try {
            System.setIn(new FileInputStream(new File("in.txt")));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        Scanner reader = new Scanner(System.in);
        String marks = reader.nextLine();
        Aided aided = new Aided();
        String res = aided.result(marks);
        System.out.println(res);
        System.out.println(res.hashCode());
        String selfMarks = reader.nextLine();
        SelfFinance financed = new SelfFinance();
        System.out.println(financed.result(selfMarks));
        System.out.println(financed.result(selfMarks).hashCode());
        reader.close();
    }
}
