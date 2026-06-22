import random

wordslist = ['correction', 'childish', 'beach', 'python', 'assertive', 'interference', 'complete', 'share', 'credit card', 'rush', 'south']
word = random.choice(wordslist)

### YOUR CODE STARTS FROM HERE ###

# Game variables
guessed_letters = []
wrong_guesses = 0
max_wrong_guesses = 6
body_parts = ['head', 'body', 'left arm', 'right arm', 'left leg', 'right leg']

# Create the initial display with stars for letters and spaces preserved
def get_display_word(word, guessed_letters):
    display = ""
    for char in word:
        if char == ' ':
            display += ' '
        elif char.lower() in guessed_letters:
            display += char
        else:
            display += '*'
    return display

# Display the hangman state
def display_hangman(wrong_guesses):
    print(f"\nWrong guesses: {wrong_guesses}/{max_wrong_guesses}")
    if wrong_guesses > 0:
        print("Body parts on gallows:", ', '.join(body_parts[:wrong_guesses]))
    print()

# Main game loop
print("Welcome to Hangman!")
print(f"The word has {len(word)} characters.\n")

while wrong_guesses < max_wrong_guesses:
    # Show current state
    display = get_display_word(word, guessed_letters)
    print(f"Word: {display}")
    display_hangman(wrong_guesses)

    # Check if player won
    if '*' not in display:
        print(f"Congratulations! You guessed the word: {word}")
        break

    # Get player's guess
    guess = input("Guess a letter: ").lower()

    # Validate input
    if len(guess) != 1 or not guess.isalpha():
        print("Please enter a single letter.")
        continue

    # Check if letter was already guessed
    if guess in guessed_letters:
        print(f"You already guessed '{guess}'. Try a different letter.")
        continue

    # Add to guessed letters
    guessed_letters.append(guess)

    # Check if guess is correct
    if guess in word.lower():
        print(f"Good guess! '{guess}' is in the word.")
    else:
        wrong_guesses += 1
        print(f"Sorry, '{guess}' is not in the word.")
        if wrong_guesses < max_wrong_guesses:
            print(f"Added {body_parts[wrong_guesses - 1]} to the gallows.")

    print()

# Game over check
if wrong_guesses >= max_wrong_guesses:
    print(f"Game Over! All body parts are on the gallows.")
    print(f"The word was: {word}")
