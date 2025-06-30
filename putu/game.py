import random
wordList = ["exo", "aeri", "giselle", "seventeen", "carat"]
word = random.choice(wordList)
guessedWord = ['_'] * len(word)
attempts = 10

while attempts > 0:
    print("\nCurrent word: " + ' '.join(guessedWord))