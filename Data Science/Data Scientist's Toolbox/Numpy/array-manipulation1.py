import numpy as np

# Enter your code here. Read input from STDIN. Print output to STDOUT
def array_split(i,r,c):
    #Write your code below
    x = np.arange(0,i, 1)
    y = x.reshape(r,c)
    a,b = np.hsplit(y,2)
    print(a)
    print(b)
    

if __name__=="__main__":