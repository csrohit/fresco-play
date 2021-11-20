# Problem statements

## 7. Probability and Statistics 7

- On New Year's Eve, the probability of a person having an car accident is 0.09. The probability of a person driving while intoxicsted is 0.32 and the probability of a person having a car accident while intoxicated is 0.15.
- What is the probability of a person driving while intoxicated or having a car accident?.

- On New Year's Eve, the probability of a person having a car accident is 0.09. The probability of a person driving while intoxicated is 0.32 and the probability of a person having a car accident while intoxicated is 0.15.
- What is the probability of a person driving while intoxicated or having a car accident?

### Probabilities

 1. P(accident)=0.09

 2. P(intoxicated)=0.32
 3. P(accident and intoxicated)=0.15

**Note:**

1. Return the probability in decimal rounded off to 2 decimal places

2. **Hint:** Use Addition rule and Non-Mutually Exclusive

### Function Description

**Function Name**: accident()

   1. **Output**:
      - *ans*: Float - *Denoting&nbsp;probability of a person driving while intoxicated or having a car accident?*

## 8. Chi Squared test

### Test your Hypothesis with the Chi-Squared test

The table shows the contingency table of marital status by education. Use the Chi-Square Test for testing Homogeneity.
| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

| **Marital  status** | **Middle School** | **High School** | **Bachelors** | **Masters** | **PhD** |
| ------------------- | ----------------- | --------------- | ------------- | ----------- | ------- |
| **Single**          | 18                | 36              | 21            | 9           | 6       |
| **Married**         | 12                | 36              | 45            | 36          | 21      |
| **Divorced**        | 6                 | 9               | 9             | 3           | 3       |
| **Widowed**         | 3                 | 9               | 9             | 6           | 3       |

### Hypothesis

Null Hypothesis:

- There is no difference in distribution between the types of education level in terms of marital status.
 Alternate Hypothesis:
- There is a difference in distribution between the types of education level in terms of marital status.

### Steps to be followed

   Write a function ***chi_test()*** that does the following sequence of steps

   1. Declare a 2D array with the values mentioned in the contingency table of marital status by education.
   2. Calculate the values of
       - Chi-Square Statistic
       - Degree of Freedom
       - P value
 and assign it to variables **stat,dof, p_val** respectively

    3. Assume the alpha value to be 0.05
    4. Compare the P value with alpha and decide whether or not to reject the null hypothesis.
       - If Rejected assign the string \"Reject the Null Hypothesis\" to **res** variable
       - Else assign the string  \"Failed to reject the Null Hypothesis\" to **res** variable
    5. Hint: Use chi2_contingency() of scipy package.
