import pandas as pd

import numpy as np

# Task 1

heights_A = pd.Series([176.2,158.4,167.6,156.2,161.4])

heights_A.index = ['s1','s2','s3','s4','s5']
print(heights_A[1])


# Task 2
print(heights_A[1:-1])


# Task 3

weights_A = pd.Series([85.1,90.2,76.8,80.4,78.9])

weights_A.index = ['s1','s2','s3','s4','s5']

df_A = pd.DataFrame()

df_A['Student_height'] = heights_A

df_A['Student_weight'] = weights_A

# df_A.to_csv('classA.csv')
height = df_A['Student_height']
print(type(height))


# TASK 4
df_s1s2 = df_A.loc[['s1', 's2'], :]
print(df_s1s2)


# Task 5
df_s2s5s1 = df_A.loc[['s2', 's5', 's1'], :]
print(df_s2s5s1)


# Task 6
df_s1s4 = df_A[df_A.index.isin(['s1','s4'])]
print(df_s1s4)
