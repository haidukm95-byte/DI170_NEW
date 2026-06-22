#Exercise 3 : Who’s the song producer?
#Goal: Create a Song class to represent song lyrics and print them.

class Song:
    def __init__(self, lyrics):
        self.lyrics=lyrics
        lyrics=[]
    def sing_me_a_song(self):
        self.lyrics=', '.join(self.lyrics)
        print(self.lyrics)

stairway=Song(['There`s a lady who`s sure', 'all that glitters is gold', 'and she`s buying a stairway to heaven'])
stairway.sing_me_a_song()
    