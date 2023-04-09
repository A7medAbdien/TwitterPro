import re

import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator

from collections import Counter

import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

nltk.download('stopwords')
nltk.download('wordnet')
stopwordlist = stopwords.words("english")

"""
# Term Frequency (TF)
"""


def preprocess(textdata):
    processed_text = []

    # Create Lemmatizer and Stemmer.
    wordLemm = WordNetLemmatizer()

    # Defining regex patterns.
    urlPattern = r"((http://)[^ ]*|(https://)[^ ]*|( www\.)[^ ]*)"
    userPattern = r'@[^\s]+'
    alphaPattern = r"[^a-zA-Z0-9]"
    oneOccPattern = r"^. | . | .$"
    sequencePattern = r"(.)\1\1+"
    seqReplacePattern = r"\1\1"

    for tweet in textdata:
        tweet = tweet.lower()

        # Replace all URls with 'URL'
        tweet = re.sub(urlPattern, '', tweet)

        # Replace all emojis.
        # for emoji in emojis.keys():
        #     tweet = tweet.replace(emoji, "EMOJI" + emojis[emoji])

        # Replace @USERNAME to 'USER'.
        tweet = re.sub(userPattern, '', tweet)

        # Replace all non alphabets.
        tweet = re.sub(alphaPattern, " ", tweet)

        # Replace 3 or more consecutive letters by 2 letter.
        tweet = re.sub(sequencePattern, seqReplacePattern, tweet)

        tweet = re.sub(oneOccPattern, ' ', tweet)

        tweetwords = ''
        for word in tweet.split():
            # Checking if the word is a stopword.
            if word not in stopwordlist:
                # if len(word)>1:
                # Lemmatizing the word.
                word = wordLemm.lemmatize(word)
                tweetwords += (word + ' ')

        processed_text.append(tweetwords)

    return processed_text


def show_most_frequent_terms(key, df, ngram=1):
    count_all = Counter()
    user_tweets_terms = []
    for tweet in df:
        user_tweets_terms = [term for term in generate_N_grams(tweet, ngram)]
        count_all.update(user_tweets_terms)

    all_frequent_words = count_all.most_common
    frequent_words = all_frequent_words(10)

    words = list(zip(*frequent_words))[0]
    frequancy = list(zip(*frequent_words))[1]

    ax = plt.figure(figsize=(15, 5)).gca()
    ax.yaxis.set_major_locator(MaxNLocator(integer=True))

    # creating the bar plot
    plt.bar(words, frequancy, color='b', width=0.4)

    plt.xlabel("Terms")
    plt.ylabel("Frequency")
    plt.title(f'{key} Terms Frequencies')
    plt.xticks(rotation=60)
    # plt.figure(figsize=(20,7))
    plt.show()

    return all_frequent_words


def generate_N_grams(text, ngram=1):
    words = [word for word in text.split()]
    temp = zip(*[words[i:] for i in range(0, ngram)])
    ans = [' '.join(ngram) for ngram in temp]
    return ans


def get_fig(df, ngram=1):
    count_all = Counter()
    user_tweets_terms = []
    for tweet in df:
        user_tweets_terms = [term for term in generate_N_grams(tweet, ngram)]
        count_all.update(user_tweets_terms)

    all_frequent_words = count_all.most_common
    frequent_words = all_frequent_words(10)

    words = list(zip(*frequent_words))[0]
    frequency = list(zip(*frequent_words))[1]

    # ax = plt.figure(figsize=(15, 5)).gca()
    # ax.yaxis.set_major_locator(MaxNLocator(integer=True))

    # creating the bar plot
    # plt.bar(words, frequency, color='b', width=0.4)
    #
    # plt.xlabel("Terms")
    # plt.ylabel("Frequency")
    # plt.xticks(rotation=60)
    return words, frequency
