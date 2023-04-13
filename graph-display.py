"""
Visually representing Time Series (TS) data given by the user using matplotlib.
"""
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from pandas import Series
import time as t


# this changes the default date converter for better interactive plotting of dates:
plt.rcParams['date.converter'] = 'concise'


# TS Data consists only Date, Time, Magnitude.
with open('data-placeholder', 'r') as f:
    data = pd.read_csv("data-placeholder", header=1, names=('TIME', 'MAGNITUDE'))
    time = data['TIME'].tolist()
    magnitude = data['MAGNITUDE'].tolist()

print(magnitude)
print(time)

ts = Series(magnitude, index=time)

plt.ylabel("Domain 1 from metadata")
plt.xlabel("Domain 2 from metadata")
ts.plot()
plt.show()
    

t.sleep(4)

