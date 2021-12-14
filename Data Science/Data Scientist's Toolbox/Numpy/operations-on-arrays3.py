import ast
import numpy as np

# Enter your code here. Read input from STDIN. Print output to STDOUT
def array_oper(n,m,sd):
    np.random.seed(100)
    x = m + sd * np.random.randn(n)
    print(x.mean())
    print(x.std())
    print(x.var())
    
    
    

if __name__ == '__main__':