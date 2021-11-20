import numpy as np
from scipy import stats
import statistics
def stats_values(arr):
    '''
    Input : arr - Numpy array
    Output: Function must print the statistics of the array in the following order
    1. Mean
    2. Median
    3. Standard Deviation
    4. Variance
    5. Mode
    5. Inter-Quartile Range
    
    Note: All the answers must be of Float datatype.Round your answers to 2 digits.
    '''
    #Write your code here
    
    print(round(np.mean(arr),2))

    print(round(np.median(arr),2))

    print(round(np.std(arr),2))

    print(round(np.var(arr),2))

    m=stats.mode(arr)

    print(round(m[0][0],2))

    a,b=np.percentile(arr,[75,25])

    print(round(a-b,2))
    
    
    
    
    
    
    
    

if __name__ == "__main__":
    array_num=[]
    n=int(input())
    for i in range(n):
        a=input()
        af=float(a)
        array_num.append(af)
    arr=np.array(array_num)
    stats_values(arr)