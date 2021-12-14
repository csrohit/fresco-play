import numpy as np

# Enter your code here. Read input from STDIN. Print output to STDOUT
def array_slice(n,n_dim,n_row,n_col):
    x = np.arange(0,n,1).reshape(n_dim, n_row,n_col)
    b = [True, False]
    print(x[b])
    print(x[b, :, 1:3])
    
    
    
    

if __name__ == '__main__':
    n = int(input())
    n_dim = int(input())
    n_row = int(input())
    n_col = int(input())
    array_slice(n,n_dim,n_row,n_col)