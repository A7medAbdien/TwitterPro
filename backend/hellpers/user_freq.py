from twitterAPI import get_user_info
import numpy as np


def get_freq_user(df):
    df = df.groupby(df).count()
    df.sort_values(ascending=False, inplace=True)

    return df


def get_most_freq_user(df, n=10):
    df = df[:n]
    # df = df.set_axis([get_user_info(user_id).data.username for user_id in df.index])

    return np.array(df.index).tolist(), np.array(df.values).tolist()
