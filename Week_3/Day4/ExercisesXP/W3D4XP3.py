import random
import string

def get_random_string(length):
    letters = string.ascii_letters
    result_str = ''.join(random.choice(letters) for i in range(length))
    print(f"Random string: {result_str}")
    return result_str

def select_random_letters(input_string, count=1):
    if not input_string:
        return []

    selected_letters = random.choices(input_string, k=count)
    return selected_letters

result = get_random_string(5)

randomizer = select_random_letters(result, count=5)
print(f"Randomly selected letters: {randomizer}")




