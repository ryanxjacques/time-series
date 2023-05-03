"""
This file works as a listener and driver for all python files
"""
# !/usr/bin/python3

# Import Libraries
import json
import os
import sys
import datetime
import mysql.connector
import pandas as pd
import regex as re
from typing import Union

# Import Local Files
import config
import convert_data as cv
import compare_data as cd
import graph_display as gd


def log(message):
    """ add message to the debug log """
    LOG_STATEMENTS.append(message)




try:
    # Connect to mySQL database
    cnx = mysql.connector.connect(
        user=os.environ.get("DB_USER"),
        password=os.environ.get("DB_PASS"),
        host=os.environ.get("DB_HOST"),
        database='time_series')

    # Create cursor object.
    cursor = cnx.cursor()
except mysql.connector.Error as err:
    log(f"Error connecting to MySQL: {err}")
    exit(-1)

# For debugging.
LOG_STATEMENTS = ["Watch directory ran!"]

def jsonify(name, message):
    """Transform python dict into json string"""
    temp_dict = dict()
    temp_dict["name"] = name
    temp_dict[name] = message
    json_string = json.dumps(temp_dict)
    return json_string


def get_file_extension(filename):
    """ Use Regex to get file extension """
    pattern = r"(?:\.)([a-z]*)"
    regex_matches = re.search(pattern, filename)
    extension = regex_matches.group(1)
    return extension

def get_contributor_id(filename):
    """ Use Regex to get contributor id """
    pattern = r"^([^~]+)~"
    regex_matches = re.search(pattern, filename)
    contributor_id = regex_matches.group(1)
    return contributor_id


def get_ts_name(filename):
    """ Use Regex to get ts_name"""
    pattern = r"~([^~]+)~"
    regex_matches = re.search(pattern, filename)
    ts_name = regex_matches.group(1)
    return ts_name



def file_is_not_supported(extension):
    """ Return True if supported and False otherwise """
    return extension not in cv.read_functions


def extract_metadata(ts_name, description, domains, units, keywords):
    meta_data = dict()
    meta_data['ts_name'] = ts_name
    meta_data['description'] = description
    meta_data['domains'] = domains
    meta_data['units'] = units
    meta_data['keywords'] = keywords
    return meta_data


def generate_csv_schema(metadata):
    row = dict()
    # Format the units and keywords as a comma-separated string
    domains_str = ', '.join(metadata['domains'].split(','))
    units_str = ', '.join(metadata['units'].split(','))
    keywords_str = ', '.join(metadata['keywords'].split(','))
    # Create Table Schema
    row['ts_name'] = metadata['ts_name']
    row['ts_desc'] = metadata['description']
    row['ts_domain'] = domains_str
    row['ts_units'] = units_str
    row['ts_keywords'] = keywords_str
    return row


def sql_insert_metadata(ts_metadata) -> int:
    query = ("INSERT INTO ts_metadata "
             "(ts_name, ts_desc, ts_domain, ts_units, ts_keywords) "
             "VALUES (%(ts_name)s, %(ts_desc)s, %(ts_domain)s, "
             "%(ts_units)s, %(ts_keywords)s)")
    cursor.execute(query, ts_metadata)
    cnx.commit()
    id = cursor.lastrowid
    return id


def sql_insert_data(df: pd.DataFrame, columns):
    # change datetime column to proper format for mySQL
    df = df.fillna(value='NULL')
    df['ts_datetime'] = df['ts_datetime'].apply(lambda x: datetime.datetime.strftime(x, '%Y-%m-%d %H:%M:%S'))
    query = f"INSERT INTO {'ts_data'} ({', '.join(columns)}) VALUES ({', '.join(['%s'] * len(columns))})"

    # Iterate through the rows of the pandas DataFrame and insert the data into the MySQL database
    for index, row in df.iterrows():
        data = tuple(row[column] for column in columns)
        cursor.execute(query, data)

    cnx.commit()

def watch_directory(user, usertype, ts_name):
    """ Process each file inside the watch directory (defined by config) """
    log("Entered watch directory")
    print("In watch")
    # Iterate through each file in the watch directory.
    for filename in os.listdir(config.watch_path):
        if user == get_contributor_id(filename):
            if usertype == "C":
                process_file(filename, f"{config.watch_path}/{filename}")
                os.remove(f"{config.watch_path}/{filename}")
            elif usertype == "DS":
                #TODO: get ts_name from user input
                accuracy = compare_files(filename,ts_name)
                ts_id= get_id(ts_name)
                user_id = user

                # Define the MySQL query to insert values into ts_solutions table
                query = "INSERT INTO ts_solutions (ts_id, DS/MLE_id, ts_mape) VALUES (%s, %s, %s)"

                # Define the tuple of values to insert
                values = (ts_id, user_id, accuracy)

                # Execute the query with the tuple of values
                cursor.execute(query, values)

                # Commit the changes to the database
                cnx.commit()

                # close connection
                cnx.close()
                cursor.close()
                os.remove(f"{config.watch_path}/{filename}")
    return

def get_id(ts_name) -> Union[float, None]:
    """
    Get the id of a time series
    """
    # Define the SQL query to fetch metadata_id
    query = f"SELECT ts_id FROM ts_metadata WHERE ts_name = '{ts_name}'"

    # Execute the query
    cursor.execute(query)

    # Fetch all the rows in the result set
    results = cursor.fetchall()

    # If there is at least one row, extract the ts_id value
    if results:
        ts_id = results[0][0]
    else:
        ts_id = None


    return ts_id


def compare_files(filename, ts_name) -> Union[float, None]:
    """
    Compares the forcasting of data for the selected Time Series
    """
    # Extract the file extension
    file_extension = get_file_extension(filename)

    # Check if file type is supported
    if file_is_not_supported(file_extension):
        log("File type is not supported")
        return

    # Read into pd.DataFrame
    # forecast = cv.read_functions[file_extension](path_to_file)


    ts_id = get_id(ts_name)

    print(f"TS_ID{ts_id}")

    # Define the SQL query to retrieve the data with ts_id
    query = f"SELECT * FROM ts_data WHERE ts_id = {ts_id}"

    # Read the data into a pandas DataFrame
    data = pd.read_sql(query, con=cnx)

    # drop all columns with all null values
    data = data.dropna(axis=1, how='all')

    cursor.close()
    cnx.close()

    split_index = int(len(data) * 0.8)
    # index split point for test and train files

    # grab the values from the test section of DF
    test = data.iloc[split_index:, :]

    print(test)
    forecast = cd.noise(test)
    print(forecast)

    return cd.accuracy(forecast, test)


def process_file(filename, path_to_file):
    """ Process files for storage on DB"""
    # Extract the file extension
    cursor = cnx.cursor()

    file_extension = get_file_extension(filename)
    contributor_id = get_contributor_id(filename)
    ts_name = get_ts_name(filename)


    # Check if file type is supported
    if file_is_not_supported(file_extension):
        query = "DELETE FROM ts_metadata WHERE ts_contributor = %s AND ts_name = %s"
        cursor.execute(query, (contributor_id, ts_name))
        cnx.commit()
        cursor.close()
        return log("File type is not supported")


    # Read into pd.DataFrame
    data = cv.read_functions[file_extension](path_to_file)


    # make all column names lowercase and strings
    data = data.rename(columns=str.lower)


    # get the ts_metadata row for the specified contributor_id and ts_name
    query = "SELECT ts_id, ts_desc, ts_domain, ts_units, ts_keywords FROM ts_metadata WHERE ts_contributor = %s AND ts_name = %s"
    cursor.execute(query, (contributor_id, ts_name))
    result = cursor.fetchall()

    # store the metadata in individual variables
    if result is not None:
        session_id = result[0][0]
        description = result[0][1]
        domains = result[0][2]
        units = result[0][3]
        keywords = result[0][4]
    else:
        raise ValueError("metadata does not exist")

    metadata = extract_metadata(ts_name, description, domains, units, keywords)

    # Create a dictionary representing the row to be written to the file
    row = generate_csv_schema(metadata)
    # Use metadata to clean formatting!
    try:
        data = cv.clean_headers(data, row['ts_domain'])
    except ValueError:
        query = "DELETE FROM ts_metadata WHERE ts_contributor = %s AND ts_name = %s"
        cursor.execute(query, (contributor_id, ts_name))
        cnx.commit()
        cursor.close()
        return log(f"{filename} Unable to clean headers.")

    # Catch errors by checking format.
    if not cv.check_data_format(data):
        query = "DELETE FROM ts_metadata WHERE ts_contributor = %s AND ts_name = %s"
        cursor.execute(query, (contributor_id, ts_name))
        cnx.commit()
        cursor.close()

        return log("Failed format")

    first_col = row['ts_domain'].split(", ")[0]
    # convert first column to datetime
    data[first_col] = pd.to_datetime(data[first_col], errors='coerce')

    # Graphically display the contributors data using matplotlib.
    gd.graph(data, row['ts_domain'], row['ts_name'], row['ts_units'])

    # select columns with floats, integers, datetimes, or timedelta64s
    data = data.select_dtypes(include=['float64', 'int64', 'datetime64[ns]', 'timedelta64'])

    # drop columns that don't contain floats, integers, datetimes, or timedelta64s
    data = data.drop(columns=data.columns.difference(data.columns))

    # Convert data to SQL.
    # create a list of new column names
    new_column_names = ['ts_datetime'] + ['ts_magnitude{}'.format(i) for i in range(1, len(data.columns))]

    # set the new column names using the rename() method
    sql_data = data.rename(columns=dict(zip(data.columns, new_column_names)))

    sql_data.insert(0, 'ts_id', session_id)

    sql_insert_data(sql_data, sql_data.columns.values)
    log(f"{filename} was successfully converted to SQL")
    cursor.close()
    cnx.close()
    return None

def main():
    """
    Main driver for python module
    """
    for line in sys.stdin:

        try:
            command = json.loads(line)
        except json.JSONDecodeError:
            error = jsonify("error", "Invalid JSON string")
            log(error)
            continue

        if "update" not in command:
            error = jsonify("error", "invalid request")
            log(error)

        elif command["update"]:
            # check for additional input from sdin
            user_id = "1"
            user_type = "C"
            ts_name = "ASIANPAINT"
            watch_directory(user_id, user_type, ts_name)
            result = jsonify("success", LOG_STATEMENTS)
            log(result)

        else:
            error = jsonify("error", "Unknown command")
            log(error)


if __name__ == "__main__":
    main()
