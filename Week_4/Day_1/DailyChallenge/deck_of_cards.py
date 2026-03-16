#The Deck of cards class should NOT inherit from a Card class.

#The requirements are as follows:

  #  The Card class should have a suit (Hearts, Diamonds, Clubs, Spades) and a 
  # value (A,2,3,4,5,6,7,8,9,10,J,Q,K)
  #  The Deck class :
   #     should have a shuffle method which makes sure the deck of cards has 
   # all 52 cards and then rearranges them randomly.
   #     should have a method called deal which deals a single card from the deck. 
   # After a card is dealt, it should be removed from the deck.
import random

whole_deck={
            'Hearts': 'A',
            'Hearts': '2',
            'Hearts': '3',
            'Hearts': '4',
            'Hearts': '5',
            'Hearts': '6',
            'Hearts': '7',
            'Hearts': '8',
            'Hearts': '9',
            'Hearts': '10',
            'Hearts': 'J',
            'Hearts': 'Q', 
            'Hearts': 'K',
            'Diamonds': 'A',
            'Diamonds': '2',
            'Diamonds': '3',
            'Diamonds': '4',
            'Diamonds': '5',
            'Diamonds': '6',
            'Diamonds': '7', 
            'Diamonds': '8',
            'Diamonds': '9',
            'Diamonds': '10',
            'Diamonds': 'J',
            'Diamonds': 'Q',
            'Diamonds': 'K',
            'Clubs': 'A',
            'Clubs': '2',
            'Clubs': '3',
            'Clubs': '4',
            'Clubs': '5',
            'Clubs': '6',
            'Clubs': '7',
            'Clubs': '8',
            'Clubs': '9',
            'Clubs': '10',
            'Clubs': 'J',
            'Clubs': 'Q',
            'Clubs': 'K',
            'Spades': 'A',
            'Spades': '2',
            'Spades': '3', 
            'Spades': '4',
            'Spades': '5',
            'Spades': '6',
            'Spades': '7',
            'Spades': '8',
            'Spades': '9',
            'Spades': '10',
            'Spades': 'J',
            'Spades': 'Q',
            'Spades': 'K'
        }
class Card:
    def __init__(self):
        pass
    

class Deck:
    def __init__(self):
        pass
   # def shuffle(self):

count=len(whole_deck())
print(count)