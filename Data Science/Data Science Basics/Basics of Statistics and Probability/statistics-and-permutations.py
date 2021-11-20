from itertools import combinations
from itertools import permutations 
import numpy as np
import math


def comb_perm(arr):
    #Write your code here
    '''
    Input: arr : numpy array    
    Return : no_of_comb,no_of_perm : Integer
    
    
    '''
    no_of_comb= len(list(combinations(arr, 2)))
    no_of_perm= len(list(permutations(arr, 2)))
    return no_of_comb,no_of_perm

if __name__=='__main__':
    array1=[]
    n=int(input())
    for i in range(n):
        array1.append(input())
    narray1=np.array(array1)
    print(comb_perm(narray1))