import itertools

import pandas as pd

from hellpers.term_freq import preprocess, get_fig, get_most_frequent_terms

all_dfs = {'tweets': 0, 'replies': 0, 'liked tweets': 0, 'following liked tweets': 0,
           'following accounts': 0}
all_dfs = {f"{key}": pd.read_csv(f"data/{key}.csv") for key, df in all_dfs.items()}

dfs = dict(itertools.islice(all_dfs.items(), 4))

term_freq_data = {key: preprocess(df.text) for key, df in dfs.items()}
term_freq_uni_data = {key: get_most_frequent_terms(df) for key, df in term_freq_data.items()}
term_freq_bi_data = {key: get_most_frequent_terms(df, 2) for key, df in term_freq_data.items()}

data = get_fig(term_freq_data['liked tweets'])
