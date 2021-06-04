import csv
from collections import Counter

answers_dic = {'1': 'Skeleton18\nModernPentathlon24\nTriathlon24\nTrampoline24\nLuge36\nNordicCombined39\nSkiJumping40\nFreestyleSkiing42\nBeachVolleyball48\nSnowboarding48\nFigureSkating54\nAlpineSkiing61\nBobsleigh66\nTableTennis67\nTennis71\nCurling82\nArchery84\nRhythmicGymnastics84\nBadminton91\nBiathlon94\nShort-TrackSpeedSkating96\nSpeedSkating103\nSynchronizedSwimming109\nTaekwondo112\nDiving113\nCrossCountrySkiing128\nSoftball134\nEquestrian157\nWeightlifting180\nShooting181\nBoxing188\nGymnastics194\nSailing210\nBaseball216\nJudo224\nFencing230\nWrestling245\nCycling261\nVolleyball281\nBasketball287\nCanoeing295\nWaterpolo306\nHandball351\nIceHockey384\nHockey388\nFootball407\nSwimming487\nRowing567\nAthletics687\n', '4': 'China51\n', '5': 'UnitedStates\n', '8': '20126\n', '11': 'MichaelPhelps238\nMichaelPhelps198\nNatalieCoughlin256\nAlekseyNemov246\nMichaelPhelps276\n', '2': 'AlpineSkiing26.75\nArchery25.53\nAthletics26.05\nBadminton25.53\nBaseball27.05\nBasketball27.05\nBeachVolleyball29.85\nBiathlon28.81\nBobsleigh29.66\nBoxing24.20\nCanoeing26.65\nCrossCountrySkiing28.39\nCurling32.85\nCycling27.36\nDiving22.53\nEquestrian37.92\nFencing26.79\nFigureSkating25.12\nFootball24.12\nFreestyleSkiing25.76\nGymnastics21.34\nHandball28.22\nHockey26.26\nIceHockey26.92\nJudo25.69\nLuge28.83\nModernPentathlon27.25\nNordicCombined25.12\nRhythmicGymnastics18.90\nRowing27.77\nSailing29.95\nShooting31.06\nShort-TrackSpeedSkating22.69\nSkeleton29.61\nSkiJumping24.8\nSnowboarding25.04\nSoftball27.04\nSpeedSkating26.38\nSwimming22.61\nSynchronizedSwimming23.85\nTableTennis25.64\nTaekwondo23.75\nTennis26.67\nTrampoline23.91\nTriathlon28.12\nVolleyball27.26\nWaterpolo26.36\nWeightlifting24.18\nWrestling25.79\n', '6': 'UnitedStates1312\n', '10': 'India20041\nIndia20001\nIndia20083\nIndia20126\n', '7': '38\n', '3': '8618\n', '9': 'UnitedStates2008317\n'}
candidate_submission = {}
TOTAL_TESTS = 11
PASS = 0
with open('solution.csv', 'r') as csvfile: 
	csvreader = csv.reader(csvfile)
	for row in csvreader:
		cand_sol_list = row[1].split("\n")
		cand_sol_list = [x for x in cand_sol_list if x != '']
		if row[0] in answers_dic:
			our_sol_list = answers_dic[row[0]].split("\n")
			our_sol_list = [x for x in our_sol_list if x != '']
			if Counter(cand_sol_list) == Counter(our_sol_list):
				PASS += 1

print( (PASS/TOTAL_TESTS) * 100)