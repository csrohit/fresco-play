#Write your code here
import pandas as pd

import numpy as np

height_A = pd.Series([176.2,158.4,167.6,156.2,161.4])

height_A.index = ['s1','s2','s3','s4','s5']

weights_A = pd.Series([85.1,90.2,76.8,80.4,78.9])

weights_A.index = ['s1','s2','s3','s4','s5']

df_A = pd.DataFrame()

df_A['Student_height'] = height_A

df_A['Student_weight'] = weights_A

df_A['Gender'] = ['M','F','M','M','F']

s = pd.Series([165.4,82.7,'F'],index = ['Student_height','Student_weight','Gender'],name='s6')

df_AA = df_A.append(s)

print(df_AA)


#TASK - 2

my_mean = 170.0

my_std = 25.0

np.random.seed(100)

heights_B = pd.Series(np.random.normal(loc = my_mean,scale=my_std,size = 5))

heights_B.index = ['s1','s2','s3','s4','s5']

my_mean1 = 75.0

my_std1 = 12.0

np.random.seed(100)

weights_B = pd.Series(np.random.normal(loc = my_mean1,scale=my_std1,size = 5))

weights_B.index = ['s1','s2','s3','s4','s5']

df_B = pd.DataFrame()

df_B['Student_height'] = heights_B

df_B['Student_weight'] = weights_B

df_B.index=['s7','s8','s9','s10','s11']

df_B['Gender'] = ['F','M','F','F','M']

df = pd.concat([df_AA,df_B])

print(df)