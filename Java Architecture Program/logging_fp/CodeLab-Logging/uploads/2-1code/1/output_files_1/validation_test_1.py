import csv
from collections import Counter

answers_dic = {'1': '{"TotalMedals":121}\n', '4': '"Athlete":"PeterThomsen"\n', '5': '{"_id":"UnitedStates","count":1109}\n{"_id":"Russia","count":706}\n{"_id":"Germany","count":552}\n{"_id":"Australia","count":524}\n{"_id":"China","count":450}\n{"_id":"Canada","count":351}\n{"_id":"Italy","count":307}\n{"_id":"GreatBritain","count":296}\n{"_id":"France","count":287}\n{"_id":"Netherlands","count":286}\n\n', '8': '{"_id":"Badminton"}\n{"_id":"Boxing"}\n{"_id":"Shooting"}\n{"_id":"Wrestling"}\n\n', '2': '{"teen_athelets":505}\n\n', '6': '{"Athlete":"JessSchipper","Age":21,"GoldMedals":1,"SilverMedals":0,"BronzeMedals":2,"TotalMedals":3}\n', '10': '{"_id":"Athletics","count":687}\n{"_id":"Rowing","count":567}\n{"_id":"Swimming","count":487}\n{"_id":"Football","count":407}\n{"_id":"Hockey","count":388}\n\n', '7': 'UnitedStates\n', '3': '{"_id":"MikhailIgnatyev"}\n{"_id":"LauraSmulders"}\n{"_id":"PhilipHindes"}\n', '9': '{"_id":"UnitedStates","count":145}\n{"_id":"Australia","count":92}\n{"_id":"Netherlands","count":32}\n{"_id":"Japan","count":30}\n{"_id":"China","count":29}\n\n'}
candidate_submission = {}
TOTAL_TESTS = 10
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
