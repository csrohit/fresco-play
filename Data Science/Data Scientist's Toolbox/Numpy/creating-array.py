import numpy as np

# Enter your code here. Read input from STDIN. Print output to STDOUT


def array_operations(l):
    #Write your code below
    arr = np.array(l)
    print(type(arr))
    print(arr.ndim)
    print(arr.shape)
    print(arr.size)
    
    

if __name__ == "__main__":
    l = list(map(int,input().split()))
    array_operations(l)