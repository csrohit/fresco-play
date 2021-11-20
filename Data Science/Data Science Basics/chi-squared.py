from scipy.stats import chi2_contingency
from scipy.stats import chi2

def chi_test():
    '''
    Output
    1. stat: Float
    2. dof : Integer
    3. p_val: Float
    4. res: String
    '''
    #Note: Round off the Float values to 2 decimal places.
    table=[[18,36,21,9,6],[12,36,45,36,21],[6,9,9,3,3],[3,9,9,6,3]]

    stat,p_val,dof,res=chi2_contingency(table)
    
    prob=0.95
    critical=chi2.ppf(prob, dof)

    if abs(stat) >= critical:
        res = 'Reject the Null Hypothesis'
    else:
        res= 'Failed to reject the Null Hypothesis'

    alpha=1.0-prob
    if p_val <= alpha:
        res = 'Reject the Null Hypothesis'
    else:
        res = 'Failed to reject the Null Hypothesis'
    
    stat = round(stat,2)
    dof = round(dof,2)
    p_val = round(p_val,2)
    
    
    return stat,dof,p_val,res   

if __name__=='__main__':
	print(chi_test())
