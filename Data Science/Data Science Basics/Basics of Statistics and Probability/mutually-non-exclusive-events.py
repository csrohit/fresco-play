from scipy import stats

def accident():
    '''
    output: ans : Float
    '''
    #Write your code here
    #Assign the probability value to the variable ans. Round off to 2 decimal places
    
    # let a be the event that a person having a car has an accident
    # let b be the event that a person being int0xicated while driving
    pa = 0.09   # probability of accident
    pb = 0.32   # probability of being intoxicated
    pa_and_b = 0.15  # probability of being intoxicated and having an accident
    # we have to find pa_or_b

    ans= pa+pb - pa_and_b
    
    return ans

if __name__=='__main__':
	print(accident())