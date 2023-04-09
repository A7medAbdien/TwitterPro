import itertools

import pandas as pd
import seaborn as sns

from hellpers.analysis import preprocess, get_fig

sns.set_theme(style='dark')

all_dfs = {'user_tweets_df': 0, 'user_replies_df': 0, 'user_liked_df': 0, 'following_liked_tweets_df': 0,
           'following_users_df': 0}
all_dfs = {f"{key}": pd.read_csv(f"data/{key}.csv") for key, df in all_dfs.items()}

dfs = dict(itertools.islice(all_dfs.items(), 4))

pre_dfs = {key: preprocess(df.text) for key, df in dfs.items()}

data = get_fig(pre_dfs['user_liked_df'])
