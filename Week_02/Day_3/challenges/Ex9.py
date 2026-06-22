print('''
\nExercise 9
Instructions

Write a function to find if an array is monotonic (sorted either ascending of descending)
''')
def is_monotonic(array):
    is_non_decreasing=True
    is_non_increasing=True
    for i in range(1, len(array)):
        if array[i]<array[i-1]:
            is_non_decreasing=False
        if array[i]>array[i-1]:
            is_non_increasing=False
        if not is_non_decreasing and not is_non_increasing:
            return False
    return is_non_decreasing or is_non_increasing

array1=[7,6,5,5,2,0]
array2=[2,3,3,3]
array3=[1,2,0,4]

print(f"{array1}: {is_monotonic(array1)}")
print(f"{array2}: {is_monotonic(array2)}")
print(f"{array3}: {is_monotonic(array3)}")