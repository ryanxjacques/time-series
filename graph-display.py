"""
Visually representing Time Series (TS) data given by the user using matplotlib.
"""
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from pandas import Series
from pandas import DataFrame

# this changes the default date converter for better interactive plotting of dates:
plt.rcParams['date.converter'] = 'concise'



#TODO: Open metadata first to check scalars. This will allow several magnitudes to be stored in one magnitude graph.
# Create as many magnitudes as needed. Can update from magnitude[] to magnitude[][] to store different magnitudes.
with open("metadata-placeholder.csv", 'r') as g:
    # This will never change with our consistent formatting
    metadata = pd.read_csv("metadata-placeholder.csv", header=None, names=('TS_NAME', 'DESCRIPTION', 'DOMAINS',
                                                                   'UNITS', 'KEYWORDS', 'SCALAR'), nrows=2)
    ts_name = metadata['TS_NAME'].values[1]
    description = metadata['DESCRIPTION'].values[1]
    domains = metadata['DOMAINS'].values[1].split(", ")
    x_domain = domains[0]
    y_domain = domains[1]
    units = metadata['UNITS'].values[1]
    keywords = metadata['KEYWORDS'].values[1]
    scalar = int(metadata['SCALAR'].values[1])

# TS Data consists only Date, Time, Magnitude.
with open("data-placeholder.csv", 'r') as f:
    # this can change when introducing multiple scalars (SEE pandas.DataFrame)
    data = pd.read_csv("data-placeholder.csv", header=1, names=('TIME', 'MAGNITUDE'))
    data.dropna(subset=['TIME', 'MAGNITUDE'], inplace=True)
    print(data)
    time = data['TIME'].values
    magnitude = data['MAGNITUDE'].values
    length = len(data)


if scalar == 1:
    ts = Series(magnitude, index=time)
else:
    ts = DataFrame(magnitude, index=time)

plt.ylabel(f"{y_domain} ({units})")
plt.xlabel(x_domain)
plt.title(ts_name)
ts.plot()
plt.show()
