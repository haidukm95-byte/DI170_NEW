#DailyChallenge Day 4 Challenge 2

def remove_consecutive_letters(s):
    if not s:
        return ""
    result = s[0] # Initialize result with the first character
    for char in s[1:]: # Iterate from the second character
        if char != result[-1]: # Check if the current character is different from the last
            result += char # If different, append it
    return result

# Example Usage:
input_string = input("Type phrase with consecutive letters: ")
output_string = remove_consecutive_letters(input_string)
print(f"Original: {input_string}")
print(f"Modified: {output_string}")