import numpy as np
import pandas as pd


def remove_timezone(date_str):
    return date_str[:-6]


def get_most_freq_time(df):
    df = pd.DataFrame(df)
    df['created_at'] = df['created_at'].apply(remove_timezone)
    df['created_at'] = pd.to_datetime(df['created_at'], format='%Y-%m-%d %H:%M:%S')

    # Add `hour` and `day` columns
    df["hour"] = df["created_at"].dt.hour
    df["day"] = pd.Categorical(df["created_at"].dt.day_name(),
                               categories=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
                                           "Sunday"], ordered=True)

    # Create a pivot table with counts of repeated `created_at` values by hour and day
    pivot_table = pd.pivot_table(df, values="created_at", index="hour", columns="day", aggfunc="count", fill_value=0)

    # Add any missing hours to the pivot table
    pivot_table = pivot_table.reindex(np.arange(24), fill_value=0)
    return np.array(pivot_table).tolist()
