import numpy as np

# Enter your code here. Read input from STDIN. Print output to STDOUT
def array_oper(num1,num2):
    np.random.seed(100)
    x = np.random.randint(num1,num2,size=(5,6))
    print(x.sum(axis=0)[-1])
    print(x.sum(axis=1)[-1])
    
    

if __name__ == "__main__":
    num1 = int(input())
    num2 = int(input())
    array_oper(num1,num2)