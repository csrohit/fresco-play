from scipy import stats

def binomial():
    '''
    output: ans : Float
    '''
    #Write your code here
    #Assign the probability value to the variable ans
    #Round off to 2 decimal places

    
    ans =1 - round(stats.binom.pmf(0,4,0.6),2)
    return ans

if __name__=='__main__':
	print(binomial())