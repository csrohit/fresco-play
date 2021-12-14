import numpy as np

# Enter your code here. Read input from STDIN. Print output to STDOUTd

def array_attributes(l):
    #write your code here
    arr = np.array(l)
    print(type(arr))
    print(arr.ndim)
    print(arr.shape)
    print(arr.size)
    print(arr.dtype)
    print(arr.itemsize)
    

if __name__=="__main__":
    r=int(input())
    l=[]
    for i in range(r):
        n = list(map(int,input().split()))
        l.append(n)
    array_attributes(l)