from twitterAPI import get_user_info
import pandas as pd
import numpy as np

# comm = {}


def get_comm(texts):
    if is_common(texts):
        dfs = [to_df(text) for text in texts]
        return comm_bar(dfs), comm_venn(texts)


def is_common(comm):
    user, following = comm
    if type(user) != pd.core.series.Series:
        user = list(zip(*user()))[0]
        following = list(zip(*following()))[0]
    else:
        user = user.index
        following = following.index
    return True if (len(list(set(user).intersection(following))) > 0) else False


def comm_venn(comm):
    user, following = comm
    if type(user) != pd.core.series.Series:
        user = list(zip(*user()))[0]
        following = list(zip(*following()))[0]
    else:
        user = user.index
        following = following.index

    return len(set(user)), len(set(following)), len(list(set(user).intersection(following)))


def to_df(col):
    if type(col) != pd.core.series.Series:
        terms = list(zip(*col()))[0]
        frequancy = list(zip(*col()))[1]
        df = pd.DataFrame({'term': terms, 'frq': frequancy})
    else:
        df = pd.DataFrame({'term': col.index, 'frq': col.values})
    return df


def comm_bar(comm_dfs):
    df1, df2 = comm_dfs

    comm = pd.merge(df1, df2, on=['term'], how="inner").set_index(['term'])
    comm.rename(columns={'frq_x': 'user', 'frq_y': 'following'}, inplace=True, errors='raise')
    comm = comm.sort_values(by=['user'], ascending=False)[:20]
    # if (comm.index.dtype == 'int64'): comm = comm.set_axis([get_user_info(id).data.username for id in comm.index])

    return tolist(comm.index), tolist(comm['user']), tolist(comm['following'])


def tolist(series):
    return np.array(series).tolist()
