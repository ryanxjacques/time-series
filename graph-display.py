"""
Visually representing Time Series (TS) data given by the user using matplotlib.
"""
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# this changes the default date converter for better interactive plotting of dates:
plt.rcParams['date.converter'] = 'concise'

with open("TestData/metadata-placeholder.csv", 'r') as g:
    # This will never change with our consistent formatting
    metadata = pd.read_csv("TestData/metadata-placeholder.csv", header=None, names=('TS_NAME', 'DESCRIPTION',
                                                                   'UNITS', 'KEYWORDS'), nrows=2)
    ts_name = metadata['TS_NAME'].values[1]
    description = metadata['DESCRIPTION'].values[1]
    units = metadata['UNITS'].values[1]
    # units can be multiple <<
    keywords = metadata['KEYWORDS'].values[1]

# TS Data consists only Date, Time, Magnitude.
with open("TestData/data-placeholder.csv", 'r') as f:
    # this can change when introducing multiple scalars (SEE pandas.DataFrame)
    data = pd.read_csv("TestData/data-placeholder.csv", header=0)
    columns = data.columns.values
    #list of column names

    data.dropna(subset=columns,how='all', inplace=True)
    # drop NA rows iff all values are NaN

    time = data[columns[0]].values
    # first column of data is always time. (common practice)

data.set_index(time, inplace=True)

# Matplotlib graphing
for column in columns:
    plt.figure()
    if np.issubdtype(data[column].dtype, np.number):
    #only create a plot if it is numerical data
        plt.plot(data.index, data[column])
        plt.xlabel(data[columns][0][0])
        plt.ylabel(column)
        plt.title(f"{ts_name} - {column}")
        plt.savefig(f"datafigures/{ts_name}-{column}.png")
        print(f"Saved figure for {column} to file.")
        plt.close()
