import ast
import numpy as np
# Enter your code here. Read input from STDIN. Print output to STDOUT
def array_split(n,n_row,n_col):
    x = np.arange(0,n,1)
    z = x.reshape(n_row, n_col)
    a,b = np.vsplit(z,2)
    print(a)
    print(b)
    
    
    
if __name__ == "__main__":