import math

def dancers():
    '''
    output: ans : Integer
    '''
    #Write your code here
    #Assign your value to variable ans
    
    girls = math.factorial(5)/(math.factorial(2)*math.factorial(3))
    boys = math.factorial(6)/(math.factorial(3)*math.factorial(3))
    ans= boys * girls
    return int(ans)

if __name__=='__main__':
	print(dancers())