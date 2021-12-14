import numpy as np

# Enter your code here. Read input from STDIN. Print output to STDOUT

def ndarray(array_input):
    #Write your code here
    arr = np.array(array_input)
    print(arr.ndim)
    print(arr.shape)
    print(arr.size)

if __name__ == "__main__":

    s = input()
    if s == "a":
        array_input = [[[-1, 1], [-2, 2]],
        [[-3, 3], [-4, 4]],
        [[-3, 3], [-4, 4]]]

    elif s == "b":
        array_input = [[[-1, 1], [-2, 2]],
        [[-3, 3], [-4, 4]]]
        
    elif s == "c":
        array_input = [[[-1, 1], [-2, 2], [-2, 2]],
        [[-3, 3], [-4, 4], [-2, 2]],
        [[-1, 1], [-2, 2], [-2, 2]]]

    elif s == "d":
        array_input = [[[[-1, 1], [-2, 2]],
        [[-3, 3], [-4, 4]]],
        [[[-1, 1], [-2, 2]],
        [[-3, 3], [-4, 4]]]]

    elif s == "e":
        array_input = [[[[[-1, 1], [-2, 2]],
        [[-3, 3], [-4, 4]]],
        [[[-1, 1], [-2, 2]],
        [[-3, 3], [-4, 4]]]],
        [[[[-1, 1], [-2, 2]],
        [[-3, 3], [-4, 4]]],
        [[[-1, 1], [-2, 2]],
        [[-3, 3], [-4, 4]]]]]

    ndarray(array_input)