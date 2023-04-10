import itertools

import pandas as pd

from hellpers.term_freq import preprocess, get_most_freq_term
from hellpers.topic_freq import get_most_freq_topic
from hellpers.user_freq import get_most_freq_user

all_dfs = {'tweets': 0, 'replies': 0, 'likedTweets': 0, 'followingLiked': 0,
           'following': 0}
all_dfs = {f"{key}": pd.read_csv(f"data/{key}.csv") for key, df in all_dfs.items()}

dfs = dict(itertools.islice(all_dfs.items(), 4))

# Term frequency
term_freq_data = {key: preprocess(df.text) for key, df in dfs.items()}
term_freq_uni_data = {key: get_most_freq_term(df) for key, df in term_freq_data.items()}
term_freq_bi_data = {key: get_most_freq_term(df, 2) for key, df in term_freq_data.items()}

# User frequency
user_freq_data = dict(itertools.islice(all_dfs.items(), 1, 4))
user_freq_data['replies'].rename(columns={'in_reply_to_user_id': 'author_id'}, inplace=True)
user_freq_data = {key: df['author_id'] for key, df in user_freq_data.items()}
user_freq_data = {key: get_most_freq_user(df) for key, df in user_freq_data.items()}

# Topic frequency
topic_freq_data = {key: get_most_freq_topic(df) for key, df in dfs.items()}
