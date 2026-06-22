# Write a function that returns items from a list
# where item length is more than k:

sentence = 'Do or do not there is no try'
k = 2

def filter_by_length(sentence, k):
    """
    Returns all words from sentence where word length > k
    """
    words = sentence.split()
    result = []
    for word in words:
        if len(word) > k:
            result.append(word)
    return result

# Using the function
filtered_words = filter_by_length(sentence, k)
print(f"Original sentence: {sentence}")
print(f"Words with length > {k}: {filtered_words}")
