s import os, csv
cand_solution = {}
for i in os.listdir('.'):
 if i[0] in ['1','2','3','4','5','6','7','8','9']:
  try:
   cand_solution[i.replace('.txt','')] = open(i).read().replace(" ","")
  except:
   pass
w = csv.writer(open("solution.csv", "w"))
for key, val in cand_solution.items():
    w.writerow([key, val])