"""
Compare the DS/MLE forcasting model with training set of data
"""
import pandas as pd
import numpy as np
def accuracy(forecast_data: pd.DataFrame, test_data: pd.DataFrame) -> float:
    """
    Calculates and returns the accuracy of forecasted data using test data
    """
    if forecast_data.columns.tolist() != test_data.columns.tolist():
        raise ValueError("Can only compare dataframes with the same columns")

    # Determine the smaller DataFrame
    if len(forecast_data) <= len(test_data):
        smaller = forecast_data
        larger = test_data
    else:
        smaller = test_data
        larger = forecast_data

    # How many rows need to be removed if inconsistent data?
    overflow_rows = len(larger) - len(smaller)


    # remove them from the larger for even comparison and reset index
    if larger.all == test_data.all:
        test_data = test_data.drop(df.tail(overflow_rows).index + 1)
        test_data = test_data.reset_index(drop=True)

    else:
        forecast_data = forecast_data.drop(df.tail(overflow_rows).index + 1)
        forecast_data = forecast_data.reset_index(drop=True)


    print(forecast_data)
    print(test_data)
    # go over column and sum each value
    f_val = 0
    t_val = 0
    for column in test_data.columns:
        f_val += forecast_data[column].sum()
        t_val += test_data[column].sum()


    mape = 1 - np.abs((t_val - f_val)/t_val)

    return mape

def noise(data: pd.DataFrame) -> pd.DataFrame:
    """
    Add random noise to a pd.DataFrame for testing
    """
    # only select columns with numerical values
    numeric_cols = data.select_dtypes(include=np.number).columns
    # generate noise on the columns
    np_noise = np.random.normal(0, 1, data[numeric_cols].shape)
    # add the noise to the numeric columns
    data[numeric_cols] = data[numeric_cols].to_numpy() + np_noise
    return data