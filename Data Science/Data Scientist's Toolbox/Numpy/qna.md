# Contributed By: Rohit Nimkar

## Introduction to NumPy

### What is the output of the following code?

```Python
import numpy as np

x = np.array([[3.2, 7.8, 9.2],
             [4.5, 9.1, 1.2]], dtype='int64')
print(x.itemsize)
```

Ans: **8**

### Which of the following is True about Numpy array data elements?

Ans: **Data elements are of same type and of fixed size**

### Which of the following attribute returns the number of elements in each dimension of a multi dimensional array?

Ans: **shape**

### What does flags attribute of an ndarray return?

Ans: **A tuple with details of other attributes**

### Which of the following attribute determine the number of dimensions of a ndarray?

Ans: **ndim**

### A tuple with details of other attributes

Ans: **nbytes**

### What is the output of the following code?

```Python
y = np.array([3+4j, 0.4+7.8j])
print(y.dtype)
```

Ans: **complex128**


## Basic Operations on NumPy Arrays

### What is the shape of the broadcasting array resulted from arrays with shapes (9, 2, 1, 5) and (3, 1)?
Ans: ~~Not Feasible~~

### Is broadcasting feasible between two arrays whose shapes are (5, 8, 2) and (2,)?
Ans: **yes**

## Which of the following method is used to check if a number is infinite or not?
Ans: **isinf**

## What is the output of the following code?
```Python
    import numpy as np
    x = np.arange(4)
    y = np.arange(4)
    print(x == y)
```
Ans: **[ True True True True]**

## What is the output of the following code?
```Python
    import numpy as np
    print(np.repeat(3, 4))
```
Ans: **[3 3 3 3]**