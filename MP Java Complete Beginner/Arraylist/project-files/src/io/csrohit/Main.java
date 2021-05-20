package io.csrohit;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        int capacity;
        int stops;
        List<String> listOfInputs=new ArrayList<>();
        BusProb bp = new BusProb();
        capacity=10;
        stops=4;
        listOfInputs.add("+2501 +2502 +2503 +2504");
        listOfInputs.add("-2501 -2504 +2505 +2506 +2507 +2509");
        listOfInputs.add("+2501 +2511 -2502 -2505");
        listOfInputs.add("+2513 -2507 -2503 -2511 -2509");
        String query="2";

        String actual=bp.output(capacity, stops, listOfInputs, query);
    }
}
