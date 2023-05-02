"""
Visually representing Time Series (TS) data given by the user using matplotlib.
"""
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
import config


def graph(data:pd.DataFrame, domain, name, units):
    # this changes the default date converter for better interactive plotting of dates:
    plt.rcParams['date.converter'] = 'concise'

    columns = domain
    # list of column names
    print(columns)

    data.dropna(subset=columns, how='all', inplace=True)
    # drop NA rows iff all values are NaN

    print(data[columns[0]].values)
    time = pd.to_datetime(data[columns[0]].values)
    # first column of data is always time. (common practice)
    # convert time to_datetime for better plotting

    data.set_index(time, inplace=True)
    # set index to time for plotting

    # Matplotlib graphing
    for column in columns:
        plt.figure()
        if np.issubdtype(data[column].dtype, np.number):
            # only create a plot if it is numerical data
            plt.plot(data.index, data[column], color=sns.color_palette('Paired')[5], linewidth=.7)
            plt.xlabel(columns[0])
            plt.ylabel(column)
            plt.title(f"{name} - {column}")
            plt.grid(True)
            plt.savefig(f"{config.graph_path}/{name}-{column}.png")
            print(f"Saved figure for {column} to file.")
            plt.close()