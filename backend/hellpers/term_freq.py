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


def preprocess(textdata):
    processed_text = []

    # Create Lemmatizer and Stemmer.
    word_lemm = WordNetLemmatizer()

    # Defining regex patterns.
    url_pattern = r"((http://)[^ ]*|(https://)[^ ]*|( www\.)[^ ]*)"
    user_pattern = r'@[^\s]+'
    alpha_pattern = r"[^a-zA-Z0-9]"
    one_occ_pattern = r"^. | . | .$"
    sequence_pattern = r"(.)\1\1+"
    seq_replace_pattern = r"\1\1"

    for tweet in textdata:
        tweet = tweet.lower()

        # Replace all URls with 'URL'
        tweet = re.sub(url_pattern, '', tweet)

        # Replace all emojis.
        # for emoji in emojis.keys():
        #     tweet = tweet.replace(emoji, "EMOJI" + emojis[emoji])

        # Replace @USERNAME to 'USER'.
        tweet = re.sub(user_pattern, '', tweet)

        # Replace all non alphabets.
        tweet = re.sub(alpha_pattern, " ", tweet)

        # Replace 3 or more consecutive letters by 2 letter.
        tweet = re.sub(sequence_pattern, seq_replace_pattern, tweet)

        tweet = re.sub(one_occ_pattern, ' ', tweet)

        tweet_words = ''
        for word in tweet.split():
            # Checking if the word is a stopword.
            if word not in stopwordlist:
                # if len(word)>1:
                # Lemmatizing the word.
                word = word_lemm.lemmatize(word)
                tweet_words += (word + ' ')

        processed_text.append(tweet_words)

    return processed_text


def get_most_frequent_terms(df, ngram=1):
    count_all = Counter()
    user_tweets_terms = []
    for tweet in df:
        user_tweets_terms = [term for term in generate_n_grams(tweet, ngram)]
        count_all.update(user_tweets_terms)

    all_frequent_words = count_all.most_common
    frequent_words = all_frequent_words(10)

    words = list(zip(*frequent_words))[0]
    frequency = list(zip(*frequent_words))[1]

    return words, frequency


def generate_n_grams(text, ngram=1):
    words = [word for word in text.split()]
    temp = zip(*[words[i:] for i in range(0, ngram)])
    ans = [' '.join(ngram) for ngram in temp]
    return ans


def get_fig(df, ngram=1):
    count_all = Counter()
    user_tweets_terms = []
    for tweet in df:
        user_tweets_terms = [term for term in generate_n_grams(tweet, ngram)]
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
