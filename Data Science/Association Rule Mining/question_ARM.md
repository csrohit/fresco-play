### Welcome to the first Hands On association rule mining. 
- In this exercise , you will try out ASM regression using mlxtend library that you have learnt in the course. 
- We have created this Python Notebook with all the necessary things needed for completing this exercise. 
- To run the code in each cell click on the cell and press **shift + enter** 



#### Run the below cell to load the data on which you will be performing Association Rule Mining
#### The data has the records of items purcahed where each element of 'Data' refers to a single transaction




```python
Data = [['Power Bank', 'Screen Guard' , 'Travel Charger'],
 ['Screen Guard', 'Bluetooth Headset', 'Mobile Cover'],
 ['Screen Guard','Arm Band','Mobile Cover'],
 ['Power Bank','Screen Guard','Leather Pouch'],
 ['Bluetooth Headset', 'Power Bank' , 'Mobile Cover']]

```

 #### Run the below cell to import necessary packages to perform Association Rule Mining


```python
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules
from mlxtend.preprocessing import TransactionEncoder
import pandas as pd
pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 500)
pd.set_option('display.width', 1000)

```

### Find all the Frequent Item sets
 - Initalize TransactionEncoder as `te`
 - Fit and transform the transaction data('Data') to perform Transaction Encoding and store the result in variable `te_ary`
 - Create a dataframe of Transaction Encoded Data and store it in varaible `dataFrame`
 - Find all frequent item sets with minimum support **0.1** using **apriori function** and store the answer in the variable `frequent_itemsets`

Note: **Follow the code snippet in the course on implementing the above steps**


```python


##Start code
te = TransactionEncoder()
te_ary = te.fit(Data).transform(Data)
dataFrame = pd.DataFrame(te_ary, columns=te.columns_)
frequent_itemsets =apriori(dataFrame, min_support=0.1, use_colnames=True)
## End code
```

#### Generate association rules for all the frequent_itemsets
- Generate association rules for all the frequent_itemsets with minimum confidence 0.7 and store in variable `association_rule`. Print the same to infer the questions in the following cell.

**Hint : Use association_rules() from mlxtend package**


```python
###Start code here
association_rule = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.7)
###End code(approx 2 lines)

```

### Inferences
- What is the support value for Leather Pouch -> Screen Guard ? Store the value in Variable `support`
- What is the lift value for (Arm Band, Mobile Cover)->(Screen Guard) ? Store the value in variable `lift`. Round off to 2 decimal places
- In how many scenarios do you see 2 items (dualtons) in the antecedent set ?Stor the value in the variable `dualtons`





```python
###Start code here
support = 0.8
lift = 1.250000
dualtons = 9



```

### Run the below cell without modifying to save your answers


```python
import hashlib
import pickle
def gethex(ovalue):
  hexresult=hashlib.md5(str(ovalue).encode())
  return hexresult.hexdigest()
def pickle_ans1(value):
  hexresult=gethex(value)
  with open('ans/output1.pkl', 'wb') as file:
    hexresult=gethex(value)
    pickle.dump(hexresult,file)
def pickle_ans2(value):
  hexresult=gethex(value)
  with open('ans/output2.pkl', 'wb') as file:
    hexresult=gethex(value)
    pickle.dump(hexresult,file)
def pickle_ans3(value):
  hexresult=gethex(value)
  with open('ans/output3.pkl', 'wb') as file:
    hexresult=gethex(value)
    pickle.dump(hexresult,file)
pickle_ans1(support)
pickle_ans2(lift)
pickle_ans3(dualtons)

```


```python

```
