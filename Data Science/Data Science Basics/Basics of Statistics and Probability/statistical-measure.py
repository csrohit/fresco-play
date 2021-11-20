import numpy as np
from scipy import stats
import statistics

import math
def measures(arr):
    #Write your code here
    '''
    Input: arr : numpy array    
    Return : mean,median,std_deviation,variance,mode,iqr  : float
    
    Note: 
    1. Assign the values to designated variables
    2. Round off to 2 decimal places
    '''
    mean=round(np.mean(arr), 2)
    median= round(np.median(arr),2)
    std_deviation= round(np.std(arr),2)
    variance=round(np.var(arr),2)
    mode=round(stats.mode(arr)[0][0], 2)
    iqr= round(stats.iqr(arr), 2)
    
    
    return mean,median,std_deviation,variance,mode,iqr   

if __name__=='__main__':
    array1=[]
    n=int(input())
    for i in range(n):
        array1.append(float(input()))
    narray1=np.array(array1)
    print(measures(narray1))
	