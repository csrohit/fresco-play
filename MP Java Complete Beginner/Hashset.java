package com.nimkar.rohit;

import java.util.*;
import java.util.stream.Collectors;

public class Hashset
{
    public static String getOut(int numberOfMatches, String squads, int squad1, int squad2)
    {

        List<HashSet<String>> sets = new ArrayList<>();
        for (String match: squads.split("#")){
            HashSet<String> set = new HashSet<>(Arrays.asList(match.split(" ")));
            sets.add(set);
        }


        // all players
        HashSet<String> all = new HashSet<>(sets.get(0));
        for (int i=1; i<sets.size(); i++){
            all.retainAll(sets.get(i));
        }

        String allMatches = all.stream().collect(Collectors.joining(" "));


        // played in squad2 but not in squad 1
        squad1--;
        squad2--;


        HashSet<String> need = sets.get(squad2);
        HashSet<String> not = sets.get(squad1);

        need.removeAll(not);
        String selectMatches = need.stream().collect(Collectors.joining(" "));
        System.out.println(allMatches.hashCode());
        System.out.println(need.hashCode());
        System.out.println(allMatches + ", " + selectMatches);
        return allMatches + ", " + selectMatches;

    }


    public static int getCount(String player, String[] players){
       int count = 0;
       for(int i=0; i<players.length; i++){
           if (player.equals(players[i])){
               count++;
           }
       }
       return count;
    }

    public Hashset() {
    }
}
