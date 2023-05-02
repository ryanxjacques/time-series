"""
Converts user-given data into consistent file architecture
used by graph_display.py.
List of accepted file types:
-CSV
-JSON
-SQL databases
-HTML tables
-Xl
-ARFF
-txt
"""

import re
import pandas as pd
import mysql.connector
import main



def clean_data(file_path) -> pd.DataFrame:
    """
    Function for cleaning general data (.txt). Attempts to convert .txt to supported format.
    On failure, prompt user to convert to acceptable format.
    """
    # Read in the file
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Clean the lines
    clean_lines = []
    for line in lines:
        # Replace all tabs with commas
        line = line.replace('\t', ',')

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


def get_header_index(df, header_name):
    """
    Gets the index of header based on metadata
    """
    for i, row in df.iterrows():
        if row.tolist()[0] == header_name:
            return i
    return None


def clean_headers(df, headers) -> pd.DataFrame:
    """
    Using metadata, attempts to remove useless columns in DF
    """
    main.log(f"Rows: {headers}")
    headers = headers.split(", ")

    if list(df.columns) == headers:
        # no need to modify if headers already correct
        return df

    header_index = get_header_index(df, headers[0])


    if header_index is None:
        raise ValueError("Could not find specified domains. Please try input again.")
    # Change column names to header_index
    df.columns = df.iloc[header_index]

    # Keep only header row and rows below it
    df = df.iloc[header_index + 1:]

    # Reset index
    df = df.reset_index(drop=True)

    return df


def check_data_format(df) -> bool:
    """
    Checks if a pd.DataFrame is in the specific format of one header row followed by data rows.
    Returns True if the DataFrame is in the expected format, otherwise returns False.
    """
    # Check if DataFrame has at least two rows
    if df.shape[0] < 2:
        # print("Failed shape") # Commented out because this will go to stdout.
        return False

    # Check if all other rows have the same number of columns as the header row
    if not all(df.shape[1] == row.shape[0] for i, row in df.iloc[1:].iterrows()):
        return False

    # All checks passed, return True
    return True


read_functions = {
    "csv": pd.read_csv,
    "xls": pd.read_excel,
    "xlsx": pd.read_excel,
    "json": pd.read_json,
    "txt": clean_data,
    "html": pd.read_html,
    "sql": pd.read_sql,
    # add other file types and corresponding functions here
}
write_functions = {
    "csv": pd.DataFrame.to_csv,
    "xls" or "xl" or "xlm": pd.DataFrame.to_excel,
    "json": pd.DataFrame.to_json,
    "parquet": pd.DataFrame.to_parquet,
    "sql": pd.DataFrame.to_sql,
    "xml": pd.DataFrame.to_xml,
    "txt": pd.DataFrame.to_latex,
    "html": pd.DataFrame.to_html,


}


def pull_data(sql_connection, use):
    """
    Pulls data depending on use case
    """
    data = pd.read_sql(sql_connection)

    split_index = int(len(data) * 0.8)

    if use == "train":
        ret_data = data.iloc[:split_index, :]
    elif use == "test":
        ret_data = data.iloc[split_index:, :]

    return ret_data




def store_data(data, sql_connection):
    """
    Stores data into separate test/data/train files.
    """
    data_file = "../../TestData/data-placeholder.csv"
    train_file = "../../TestData/train-placeholder.csv"
    test_file = "../../TestData/test-placeholder.csv"

    # read the data into a cleaned pd.DataFrame

    split_index = int(len(data) * 0.8)
    # index split point for test and train files

    train = data.iloc[:split_index, :]
    test = data.iloc[split_index:, :]
    # separate data

    data.to_csv(data_file, index=False)
    train.to_csv(train_file, index=False)
    test.to_csv(test_file, index=False)

    data.to_sql(data_file, sql_connection, index=False)
    # train.to_sql(train_file, index=False)
    # test.to_sql(test_file, index=False)
    # convert data to a csv and send it to respective file locations

def convert_file(file_type1, file_loc1, file_type2, file_loc2):
    """
    Converts any file type to a specified type
    """
    data = read_functions[file_type1](file_loc1)
    data.write_functions[file_type2](file_loc2, index=False)




