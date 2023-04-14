"""
Visually representing Time Series (TS) data given by the user using matplotlib.
"""
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from pandas import Series


# this changes the default date converter for better interactive plotting of dates:
plt.rcParams['date.converter'] = 'concise'


# TS Data consists only Date, Time, Magnitude.
with open("data-placeholder.csv", 'r') as f:
    # this can change when introducing multiple scalars (SEE pandas.DataFrame)
    data = pd.read_csv("data-placeholder.csv", header=1, names=('TIME', 'MAGNITUDE'))
    time = data['TIME'].values
    magnitude = data['MAGNITUDE'].values
    length = len(data)

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

print(ts_name)
print(description)
print(x_domain)
print(y_domain)
print(units)
print(keywords)
print(scalar)
print(length)



ts = Series(magnitude, index=time)

plt.ylabel(f"{y_domain} ({units})")
plt.xlabel(x_domain)
plt.title(ts_name)
ts.plot()
plt.show()
