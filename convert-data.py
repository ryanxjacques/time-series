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
import re
import numpy as np


#TODO: look at pd.read_... there are a lot more file types that can be implemented


def clean_data(file_path) -> pd.DataFrame:
    """
    Function for cleaning general data (.txt)
    """
    # Read in the file
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Clean the lines
    clean_lines = []
    for line in lines:
        # Replace all tabs with commas
        line = line.replace('\t', ',')

        # Remove any headers or footers that don't contain data
        if line.startswith('Header'):
            continue
        elif line.startswith('Footer'):
            break

        # Split the line into columns
        columns = line.strip().split(',')

        # Clean and process the text data in each column
        cleaned_columns = []
        for col in columns:
            # Remove any non-alphanumeric characters
            col = re.sub('[^0-9a-zA-Z]+', ' ', col)

            # Convert to lowercase
            col = col.lower()

            # Append the cleaned column to the cleaned_columns list
            cleaned_columns.append(col)

        # Append the cleaned columns to the clean_lines list
        clean_lines.append(cleaned_columns)

    return pd.DataFrame(clean_lines)


import pandas as pd


# def drop_inconsistent_rows(df):
#     # Compute consistent formatting based on the majority of rows
#     # Here, we're assuming the majority of rows have the same number of columns
#     num_cols = df.apply(lambda x: len(x.dropna()), axis=1).mode()[0]
#
#     # Create a boolean mask for rows with consistent formatting
#     consistent_rows = df.apply(lambda x: len(x.dropna()) == num_cols, axis=1)
#
#     # Apply the mask to the entire DataFrame
#     df = df.loc[consistent_rows, :]
#
#     return df

import pandas as pd

import pandas as pd


def drop_inconsistent_rows(df):
    # Compute consistent formatting based on the majority of rows
    # Here, we're assuming the majority of rows have the same number of columns
    num_cols = df.apply(lambda x: len(x.dropna()), axis=1).mode()[0]
    type_counts = df.apply(lambda x: x.dropna().apply(lambda y: type(y)).value_counts().to_dict())

    # Create a boolean mask for rows with consistent formatting
    consistent_rows = df.apply(lambda x: len(x.dropna()) == num_cols and
                                         all(isinstance(x.dropna().iloc[i], tuple(type_counts[i].keys())) for i in
                                             range(len(type_counts))), axis=1)

    # Apply the mask to the entire DataFrame
    df = df.loc[consistent_rows, :]

    # Find the first inconsistent row above the first row with majority formatting
    header_row_index = 0
    for i in range(num_cols):
            if not isinstance(df.iloc[header_row_index, i], tuple(type_counts[i].keys())):
                header_row_index -= 1
                break

    # Set the header row and reset the index
    header = df.iloc[header_row_index, :]
    df = df.iloc[header_row_index + 1:, :]
    df.columns = header

    return df


read_functions = {
    "csv": pd.read_csv,
    "xls": pd.read_excel,
    "xlsx": pd.read_excel,
    "json": pd.read_json,
    "txt": clean_data,
    #"sql": pd.read_sql,
    # add other file types and corresponding functions here
}


file_name = "TestData/Type Testing/placeholderfile.xls"
data_file = "./TestData/data-placeholder.csv"
train_file = "./TestData/train-placeholder.csv"
test_file = "./TestData/test-placeholder.csv"
file_ext = file_name.split('.')[-1]




if file_ext not in read_functions:
    raise ValueError(f"Unsupported file type {file_ext}")


data = read_functions[file_ext](file_name)
# read the data into a cleaned pd.DataFrame

data = drop_inconsistent_rows(data)
# fixes formatting inconsistencies


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







