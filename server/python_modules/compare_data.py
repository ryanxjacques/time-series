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
        test_data = test_data.drop(test_data.tail(overflow_rows).index + 1)
        test_data = test_data.reset_index(drop=True)

    else:
        forecast_data = forecast_data.drop(forecast_data.tail(overflow_rows).index + 1)
        forecast_data = forecast_data.reset_index(drop=True)

    # go over column and sum each value
    f_val = 0
    t_val = 0
    # only go over magnitude values
    ts_columns = [col for col in test_data.columns if col.startswith('ts_magnitude')]

    mapes = []
    for column in ts_columns:
        f_val = forecast_data[column].sum()
        t_val = test_data[column].sum()
        mape = 1 - np.abs((t_val - f_val)/t_val)
        mapes.append(mape)

    avg_mape = sum(mapes) / len(mapes)

    return avg_mape

def noise(data: pd.DataFrame) -> pd.DataFrame:
    """
    Add random noise to a pd.DataFrame for testing
    """
    # only select columns with name "ts_magnitude{x}"
    ts_columns = [col for col in data.columns if col.startswith('ts_magnitude')]
    # generate noise on the columns
    noisy = data.copy()
    np_noise = np.random.normal(0, 4, noisy[ts_columns].shape)
    # add the noise to the selected columns
    noisy[ts_columns] = noisy[ts_columns].to_numpy() + np_noise

    return noisy
