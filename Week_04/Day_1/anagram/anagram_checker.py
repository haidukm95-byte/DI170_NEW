import os

class AnagramChecker:
    def __init__(self):
        # Load the word list from file once when the class is initialized
        try:
            # Get the directory where this script is located
            script_dir = os.path.dirname(os.path.abspath(__file__))
            words_file = os.path.join(script_dir, 'words.txt')

            with open(words_file) as f:
                self.word_list = [w.strip().upper() for w in f.readlines()]
        except FileNotFoundError:
            print("Error: 'words.txt' file not found.")
            self.word_list = []
        except Exception as e:
            print(f"Error reading word list: {e}")
            self.word_list = []

    def isvalid_word(self, word):
        # Check if the given word exists in the word list
        return word.upper() in self.word_list

    def get_anagrams(self, word):
        # First check if the word is valid
        if not self.isvalid_word(word):
            return []

        anagrams = []
        sorted_word = sorted(word.upper())

        # Find all words with the same letters (anagrams)
        for w in self.word_list:
            if w != word.upper() and sorted(w) == sorted_word:
                anagrams.append(w)

        return anagrams
        


