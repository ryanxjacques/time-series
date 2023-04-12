"""
Visually representing Time Series (TS) data given by the user using matplotlib.
"""
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from pandas import Series
import time


# this changes the default date converter for better interactive plotting of dates:
plt.rcParams['date.converter'] = 'concise'


# TS Data consists only Date, Time, Magnitude.
with open('data-placeholder', 'r') as f:
    data = np.genfromtxt(f, names=['date', 'time', 'magnitude'])

    date = data['date']
    time = data['time']
    magnitude = data['magnitude']


print(magnitude)
print(date)
print(time)

# Metadata consists of TS name, Description, Domain(s), Units, Keywords,
# scalar/vector (univariate/multivariate), vector size, length, and sampling period

# with open('data-placeholder', 'r') as f:
#     data = np.genfromtxt(f, names=['name', 'description', 'domains', 'units', 'keywords',
#                                     'scalar', 'vector size', 'length', 'sampling period'])
#
#     name = data['date']

ts = pd.DataFrame(data=data) #index=pd.timedelta_range(start=0, periods=150, end=150))
ts = ts.cumsum()
ts.plot()
plt.show()


time.sleep(4)

