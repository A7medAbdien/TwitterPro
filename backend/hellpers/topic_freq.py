from collections import Counter


def get_most_freq_topic(df):
    # One problem is that Pandas will read our lists as strings, not as lists
    df = df['context_annotations'].apply(eval)
    count_all = Counter()
    for tweet in df:
        tweets_topics = [topic for topic in tweet]
        count_all.update(tweets_topics)

    all_frequent_topics = count_all.most_common
    frequent_topics = all_frequent_topics(10)

    topics = list(zip(*frequent_topics))[0]
    freq = list(zip(*frequent_topics))[1]
    return topics, freq
