from scipy import stats


def poisson():
    '''
    output: ans : Float
    '''
    #Write your code here
    #Assign the probability value to the variable ans
    #Round off to 2 decimal places

    ans=round(stats.poisson.pmf(15, 10), 2)
    
    return ans

if __name__=='__main__':
	print(poisson())
