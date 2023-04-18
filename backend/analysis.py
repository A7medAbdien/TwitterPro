import itertools

import pandas as pd

from hellpers.common import get_comm
from hellpers.term_freq import preprocess, get_most_freq_term, get_freq_term
from hellpers.time_freq import get_most_freq_time
from hellpers.topic_freq import get_most_freq_topic, get_freq_topic
from hellpers.user_freq import get_most_freq_user, get_freq_user

all_dfs = {'tweets': 0, 'replies': 0, 'likes': 0, 'fLikes': 0,
           'following': 0}
all_dfs = {f"{key}": pd.read_csv(f"data/{key}.csv") for key, df in all_dfs.items()}

dfs = dict(itertools.islice(all_dfs.items(), 4))

"""
Term frequency
"""
term_freq_data = {key: preprocess(df.text) for key, df in dfs.items()}

term_freq_uni_count = {key: get_freq_term(df) for key, df in term_freq_data.items()}
term_freq_bi_count = {key: get_freq_term(df, 2) for key, df in term_freq_data.items()}

term_freq_uni_data = {key: get_most_freq_term(df) for key, df in term_freq_uni_count.items()}
term_freq_bi_data = {key: get_most_freq_term(df) for key, df in term_freq_bi_count.items()}

"""
User frequency
"""
user_freq_data = dict(itertools.islice(all_dfs.items(), 1, 4))  # replies, likes, following likes
user_freq_data['replies'].rename(columns={'in_reply_to_user_id': 'author_id'}, inplace=True)
user_freq_data = {key: df['author_id'] for key, df in user_freq_data.items()}
user_freq_count = {key: get_freq_user(df) for key, df in user_freq_data.items()}
user_freq_data = {key: get_most_freq_user(df) for key, df in user_freq_count.items()}

"""
Topic frequency
"""
topic_freq_count = {key: get_freq_topic(df) for key, df in dfs.items()}
topic_freq_data = {key: get_most_freq_topic(df) for key, df in topic_freq_count.items()}

"""
Time frequency
"""
time_freq_data = dict(itertools.islice(all_dfs.items(), 2))
time_freq_data = {key: df['created_at'] for key, df in time_freq_data.items()}
time_freq_data = {key: get_most_freq_time(df) for key, df in time_freq_data.items()}

"""
Common Terms (User and Following)
"""
comm_data = {}
term_freq_uni_comm = [count for count in itertools.islice(term_freq_uni_count.values(), 2, 4)]
comm_data['uni_term'] = get_comm(term_freq_uni_comm)

term_freq_bi_comm = [count for count in itertools.islice(term_freq_bi_count.values(), 2, 4)]
comm_data['bi_term'] = get_comm(term_freq_bi_comm)

"""
Common Topics (User and Following)
"""
topic_freq_comm = [count for count in itertools.islice(topic_freq_count.values(), 2, 4)]
comm_data['topic'] = get_comm(topic_freq_comm)

"""
Common IDs (User and Following)
"""
user_freq_comm = [count for count in itertools.islice(user_freq_count.values(), 1, 3)]  # likes, followings likes
comm_data['user'] = get_comm(user_freq_comm)

user_freq_comm_rl = [count for count in itertools.islice(user_freq_count.values(), 0, 2)]  # replies, likes
comm_data['user_rl'] = get_comm(user_freq_comm_rl)
