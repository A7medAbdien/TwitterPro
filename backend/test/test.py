# @title Analysis Helpers

# See a Summary of column x
def get_describe(myColumn):
    """Get .describe() info."""
    return {"mean": myColumn.mean(),
            "min": myColumn.min(),
            "max": myColumn.max(),
            "count": len(myColumn)}


# get the count of values of column x
def get_count(myColumn, df):
    # temp = df.round({x: 3})

    count_df = df[myColumn].value_counts().reset_index()
    count_df.columns = [myColumn, "Count"]

    count_df = count_df.melt(id_vars=[myColumn], value_name="Count")

    total = count_df["Count"].sum()
    count_df["variable"] = (count_df["Count"] / total) * 100

    count_df = count_df.rename(columns={"variable": "%"})

    return count_df


# get the % of failures and acceptance of each value in column in x
def get_percentages(df, myColumn):
    # df['target'] = df['target'].fillna(0)
    # df = df.round({x: 3})

    count_df = get_count(myColumn, df)
    count_failure = df[df['target'] == 1][myColumn].value_counts().reset_index()
    count_accepted = df[df['target'] == 0][myColumn].value_counts().reset_index()

    count_failure = count_failure.rename(columns={'index': myColumn, myColumn: 'Failure'})
    count_accepted = count_accepted.rename(columns={'index': myColumn, myColumn: 'Accepted'})

    count_df = count_df[count_df['Count'] > COUNT_THRESHOLD]

    fc_df = cudf.merge(count_df, count_failure, on=myColumn, how='left').sort_values(by='Count', ascending=False,
                                                                                     ignore_index=True)
    fc_df = cudf.merge(fc_df, count_accepted, on=myColumn, how='left').sort_values(by='Count', ascending=False,
                                                                                   ignore_index=True)

    fc_df = fc_df.fillna(0)

    fc_df['% Failure'] = fc_df['Failure'] / fc_df['Count'] * 100
    fc_df['% Accepted'] = fc_df['Accepted'] / fc_df['Count'] * 100

    fc_df = fc_df.reindex(columns=[myColumn, 'Count', '%', 'Failure', '% Failure', 'Accepted',
                                   '% Accepted'])

    percentage_cols = ['%', '% Failure', '% Accepted']
    fc_df[percentage_cols] = fc_df[percentage_cols].round(decimals=2)

    return fc_df


# shows the distribution of count of values of column x
def show_distribution(df, myColumn, show=False):
    count = df[myColumn].value_counts().values
    f, (ax, a1) = plt.subplots(2, 1, gridspec_kw={'height_ratios': [3, 1]}, figsize=(20, 10))

    sns.distplot(count.get(), rug=True, hist=False,
                 rug_kws={"color": my_colors[5]},
                 kde_kws={"color": my_colors[5], "lw": 5, "alpha": 0.7},
                 ax=ax)

    sns.boxplot(x=count.get(), ax=a1, notch=False, showcaps=True,
                flierprops={"marker": "x"},
                boxprops={"facecolor": my_colors[5]},
                medianprops={"color": my_colors[0]}, )

    plt.suptitle(f"Distribution of Values of {myColumn} per Anode", weight="bold", size=25)
    ax.set_xlim(left=0)
    ax.set_xlabel('Count')
    sns.despine(right=True, top=True, left=True)
    if (show): plt.show()
    return count


# combine everything in one place
def all(df, myColumn):
    print(clr.S + f"{myColumn} Column Summary" + clr.E)
    print(get_describe(df[myColumn]))

    vib_time = df[myColumn].value_counts().values
    print(clr.S + f"{myColumn} Values Summary per Anode" + clr.E)
    print(get_describe(vib_time.get()))

    print(clr.S + f"Percent of {myColumn} Values in Terms of Anodes -" + clr.E)

    print("=1 apperance:", sum(vib_time == 1) / get_describe(vib_time)["count"], "\n" +
          ">10 apperance:", sum(vib_time > 10) / get_describe(vib_time)["count"], "\n" +
          ">50 apperance:", sum(vib_time > 50) / get_describe(vib_time)["count"], "\n" +
          ">100 apperance:", sum(vib_time > 100) / get_describe(vib_time)["count"], "\n")

    show_distribution(df, myColumn, True)

    return get_percentages(df, myColumn)
