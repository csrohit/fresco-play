#Write your code here
import pandas as pd

import numpy as np

heights_A = pd.Series([176.2,158.4,167.6,156.2,161.4])

heights_A.index = ['s1','s2','s3','s4','s5']

weights_A = pd.Series([85.1,90.2,76.8,80.4,78.9])

weights_A.index = ['s1','s2','s3','s4','s5']

df_A = pd.DataFrame()

df_A['Student_height'] = heights_A

df_A['Student_weight'] = weights_A

df_A_filter1 = df_A[(df_A.Student_weight < 80.0) & (df_A.Student_height > 160.0)]

print(df_A_filter1)


#TASK - 2

df_A_filter2 = df_A[df_A.index.isin(['s5'])]

print(df_A_filter2)


#TASK - 3

df_A['Gender'] = ['M','F','M','M','F']

df_groups = df_A.groupby('Gender')

print(df_groups.mean())