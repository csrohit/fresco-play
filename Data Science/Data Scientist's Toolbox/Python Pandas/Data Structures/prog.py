import pandas as pd

import numpy as np

heights_A = pd.Series([176.2,158.4,167.6,156.2,161.4])

heights_A.index = ['s1','s2','s3','s4','s5']

print(heights_A.shape)


# TASK 2

weights_A = pd.Series([85.1,90.2,76.8,80.4,78.9])

weights_A.index = ['s1','s2','s3','s4','s5']

print(weights_A.dtype)


#TASK 3

df_A = pd.DataFrame()

df_A['Student_height'] = heights_A

df_A['Student_weight'] = weights_A

print(df_A.shape)


#TASK 4

my_mean = 170.0

my_std = 25.0

np.random.seed(100)

heights_B = pd.Series(np.random.normal(loc = my_mean, scale = my_std, size = 5))

heights_B.index = ['s1','s2','s3','s4','s5']


my_mean1 = 75.0

my_std1 = 12.0

weights_B = pd.Series(np.random.normal(loc = my_mean1,scale = my_std1,size = 5))

weights_B.index = ['s1','s2','s3','s4','s5']

print(heights_B.mean())


#TASK 5

df_B = pd.DataFrame()

df_B['Student_height'] = heights_B

df_B['Student_weight'] = weights_B

print(df_B.columns)