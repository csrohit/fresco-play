import numpy as np

# Enter your code here. Read input from STDIN. Print output to STDOUT
def array_index(n,n_row,n_col):
    x = np.arange(0,n,1).reshape(n_row, n_col)
    print(x[-1, :])
    print(x[:, int(n_col/2)])
    print(x[:2, -3:])
    
    
    
    
    

if __name__ == '__main__':