import numpy as np

# Enter your code here. Read input from STDIN. Print output to STDOUT
def ndshape(d, shape1):
    #Write your code here
    x1 = np.identity(d)
    x2 = np.ones(shape1)
    print(x1)
    print(x2)
  

if __name__ == "__main__":
    d=int(input())
    shape1=list(map(int,input().split()))
    ndshape(d, shape1)