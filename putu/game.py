import random
wordList = ["exo", "aeri", "giselle", "seventeen", "carat"]
word = random.choice(wordList)
guessedWord = ['_'] * len(word)
attempts = 10

while attempts > 0:
    print("\nCurrent word: " + ' '.join(guessedWord))
    guess = input("Guess a letter: ").lower()
    if guess in word:
        for i in range(len(word)):
            if word[i] == guess:
                guessedWord[i] = guess
        print("Great guess!")
    else:
        attempts -= 1
        print("Wrong guess! Attempts left: " + str(attempts))