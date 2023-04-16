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


file_name = "placeholderfile.txt"
dest_file = "./TestData/data-placeholder.csv"
file_ext = file_name.split('.')[-1]

if file_ext not in read_functions:
    raise ValueError(f"Unsupported file type {file_ext}")

data = read_functions[file_ext](file_name)

data.to_csv(dest_file, index=False)

print(f"File {file_name} converted to CSV and saved at {dest_file}")







