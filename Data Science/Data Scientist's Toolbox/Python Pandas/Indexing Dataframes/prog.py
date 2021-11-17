import pandas as pd

import numpy as np

#TASK- 1

DatetimeIndex = pd.date_range(start = '09/01/2017',end='09/15/2017')

print(DatetimeIndex[2])


#TASK - 2

datelist = ['14-Sep-2017','09-Sep-2017']

date_to_be_searched = pd.to_datetime(datelist)

print(date_to_be_searched)


#TASK - 3

print(date_to_be_searched.isin(datelist))


#TASK - 4

arraylist = [['classA']*5 + ['classB']*5,['s1','s2','s3','s4','s5']* 2]

mi_index = pd.MultiIndex.from_product(arraylist,names=['First Level','Second Level'])

print(mi_index.levels)