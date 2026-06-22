import random
list_of_numbers = [random.randint(0, 10000) for _ in range(20000)]
target_number = 3728
def find_pairs(numbers, target):
    pairs = []
    seen = set()  
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