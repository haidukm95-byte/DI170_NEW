print('''
\nExercise 2
Instructions

Write a script that counts the number of spaces in a string.
''')
text=input('Type a random text here: ')
spaces=text.count(' ')
print(f"The number of spaces in the string is: {spaces}")

print('''
\nExercise 3
Instructions

Write a script that calculates the number of upper case letters and lower case letters in a string.
''')
askout=input('Do you wish to use the string from the previous exercise? (y/n)' )
if askout == 'n' or 'N':
    text2=input('Type a random text here:' )
else:
    text2=text
def count_case_letters(input_string):
    """
    Calculates the number of uppercase and lowercase letters in a given string.

    Args:
        input_string (str): The string to analyze.

    Returns:
        dict: A dictionary containing the counts of 'uppercase' and 'lowercase' letters.
    """
    uppercase_count = 0

    for char in input_string:
        if char.isupper():
            uppercase_count += 1
    print(f'The amount of uppercase letters is {uppercase_count}')

    return {
        'uppercase': uppercase_count
    }
    
count_case_letters(text2)