"""
Converts user-given data into consistent file architecture
used by graph-display.py.
List of accepted file types:
-CSV
-JSON
-SQL databases
-HTML tables
-Xl
-ARFF
-txt
"""

import pandas as pd

#TODO: look at pd.read_... there are a lot more file types that can be implemented

read_functions = {
    "csv": pd.read_csv,
    "xls": pd.read_excel,
    "xlsx": pd.read_excel,
    "json": pd.read_json,
    "txt": pd.read_table,
    # add other file types and corresponding functions here
}


file_name = "TestData/placeholderfile.json"
data_file = "./TestData/data-placeholder.csv"
train_file = "./TestData/train-placeholder.csv"
test_file = "./TestData/test-placeholder.csv"
file_ext = file_name.split('.')[-1]

if file_ext not in read_functions:
    raise ValueError(f"Unsupported file type {file_ext}")

data = read_functions[file_ext](file_name)
# read the data into a pd.DataFrame

split_index = int(len(data) * 0.8)
# index split point for test and train files

train = data.iloc[:split_index, :]
test = data.iloc[split_index:, :]
# separate data

data.to_csv(data_file, index=False)
train.to_csv(train_file, index=False)
test.to_csv(test_file, index=False)
# convert data to a csv and send it to respective file locations

print(f"File {file_name} converted to CSV and saved at {data_file}\n"
      f"Split into \"test\" and \"train\" files in the same directory.")







