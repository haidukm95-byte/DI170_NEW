import random

list_of_numbers = [random.randint(0, 10000) for _ in range(20000)]
target_number = 3728

def find_pairs(numbers, target):
    """
    Finds all pairs of numbers in a list that sum up to a target value.

    Args:
        numbers: A list of numbers to search through.
        target: The target sum.

    Returns:
        A list of tuples, where each tuple represents a pair of numbers that sum to the target.
    """
    pairs = []
    seen = set()  # Use a set for efficient lookup

    for number in numbers:
        complement = target - number
        if complement in seen:
            pairs.append((number, complement)) #found the pair
        seen.add(number)

    return pairs


pairs = find_pairs(list_of_numbers, target_number)

if pairs:
    print("Pairs that sum to", target_number, ":")
    for pair in pairs:
        print(pair[0], "and", pair[1], "sums to the target_number", target_number)
else:
    print("No pairs found that sum to", target_number)