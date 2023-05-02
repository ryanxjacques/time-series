"""
This file works as a listener and driver for all python files
"""
# !/usr/bin/python3

import os
import json
import sys
import time
import regex as re
import mysql.connector
import config
import convert_data as cv
import graph_display as gd

# Connect to mySQL database
cnx = mysql.connector.connect(
    user=os.environ.get("DB_USER"),
    password=os.environ.get("DB_PASS"),
    host=os.environ.get("DB_HOST"),
    database='time_series')

# For debugging.
LOG_STATEMENTS = ["Watch directory ran!"]


def log(message):
    """ add message to the debug log """
    LOG_STATEMENTS.append(message)


def jsonify(name, message):
    """Transform python dict into json string"""
    temp_dict = dict()
    temp_dict["name"] = name
    temp_dict[name] = message
    json_string = json.dumps(temp_dict)
    return json_string


# upload dir: /var/www/html/uploads
def watch_directory():
    """
    Watch directory specified in config file, and save to separate files
    :return:
    """
    log("Entered watch directory")

    # Iterate through each file in the watch directory.
    for filename in os.listdir(config.watch_path):
        log(f"FOUND FILE IN DIRECTORY: {filename}")

        # Capture the file extension with Regular Expressions.
        pattern = r"(?:\.)([a-z]*)"
        regex_matches = re.search(pattern, filename)
        file_ext = regex_matches.group(1)
        log(file_ext)

        # Check if file type is unsupported.
        supported = True
        if file_ext not in cv.read_functions:
            supported = False
            log(f"Unsupported file type {file_ext}")
            return

        # if file type is supported, read into pd.DataFrame
        data = cv.read_functions[file_ext](f"{config.watch_path}/{filename}")

        # Debug Statement
        log(f'data: \n {data} \n')

        # Metadata
        # print("Please enter in Metadata for the above file:")
        ts_name = "T"
        description = "R"
        domains = "S"
        units = "u"
        keywords = "v"

        # Format the units and keywords as a comma-separated string
        units_str = ', '.join(units.split(','))
        keywords_str = ', '.join(keywords.split(','))
        domains_str = ', '.join(domains.split(','))

        # Create a dictionary representing the row to be written to the CSV file
        row = {'ts_name': ts_name, 'ts_desc': description, 'ts_domain': domains_str, 'ts_units': units_str,
               'ts_keywords': keywords_str}

        # Write the row to the CSV file
        # TODO: Connect to mySQL database and convert data there
        # with open('../../TestData/metadata-placeholder.csv', mode='w', newline='') as csv_file:
        #     writer = csv.DictWriter(csv_file, fieldnames=['TS_NAME', 'DESCRIPTION', 'DOMAINS', 'UNITS', 'KEYWORDS'])
        #     writer.writeheader()
        #     writer.writerow(row)
        #
        # TODO: CONNECT TO CNX
        #
        # # Prepare the SQL statement for inserting a row into the table
        insert_sql = "INSERT INTO ts_metadata " \
                     "(ts_name, ts_desc, ts_domain, ts_units, ts_keywords) " \
                     "VALUES (%s, %s, %s, %s, %s)"

        # Create a cursor object to execute the SQL statement
        cursor = cnx.cursor()

        # Execute the SQL statement with the values from the dictionary
        cursor.execute(insert_sql,
                       (row['ts_name'], row['ts_desc'], row['ts_domain'], row['ts_units'], row['ts_keywords']))

        # Commit the changes and close the database connection
        cnx.commit()

        log("Metadata saved to 'metadata-placeholder.csv'.")

        # Use metadata to clean formatting!
        try:
            data = cv.clean_headers(data, domains_str)
        except ValueError:
            log("Unable to clean data. Check formatting specifications.")
            supported = False

        """ >>> THIS THROWS A "FAILED SHAPE" ERROR  """
        # Catch errors by checking format. Prompt user to check their data again to remove white space/leading values, etc.
        # if cv.check_data_format(data):
        #     pass
        #     data.to_sql('ts_data', cnx, index=False)
        #     log(f"File {filename} converted to CSV and saved.\n"
        #           f"Split into \"test\" and \"train\" files in the same directory.")

        #     # Using accepted format data and metadata, we can graphically display the contributors data using matplotlib
        #     if supported:
        #         gd.graph()
        #         log("Is this an accurate graphical representation of your data?")
        #         accepted = user_input_bool()
        #
        #         if accepted:
        #             log("Thank you for contributing to our repository! Have a great day!")
        #         else:
        #             log("We're sorry, we have format specifications that may have slipped through our system. "
        #                   "Please check our formatting specifications and try again")
        #
        #     else:
        #         # if not, store data and prompt user to submit data in the future. Warn about use of algorithm comparisons.
        #         log("Supported file type, unsupported format. Please check to remove trailing 0s, white space, "
        #               "and other interference. Data should be in the following format:\n"
        #               "Header1\tHeader2\tHeader3\t\n Data1 \t Data2 \t Data3 \t\n"
        #               " Data1 \t Data2 \t Data3 \t\n  ...  \t  ...  \t  ...  ")
        #
                # convert to csv and store in test/train/data placeholder

    # Close mySQL connection when watch_directory finishes.
    cnx.close()
    return  # None


def user_input_bool() -> bool:
    """
    Prompt to get user input for Y/N questions
    """
    while True:
        user_input = input("Enter 'Y' or 'N': ")
        if user_input.upper() == 'Y':
            accepted = True
            return accepted
        elif user_input.upper() == 'N':
            accepted = False
            return accepted
        else:
            log("Invalid input. Please enter 'Y' or 'N'.")


def main():
    """
    Main driver for python module
    """
    for line in sys.stdin:

        try:
            command = json.loads(line)
        except json.JSONDecodeError:
            error = jsonify("error", "Invalid JSON string")
            print(error, flush=True)
            continue

        if "update" not in command:
            error = jsonify("error", "invalid request")
            print(error, flush=True)

        elif command["update"]:
            watch_directory()
            result = jsonify("success", LOG_STATEMENTS)
            print(result, flush=True)

        else:
            error = jsonify("error", "Unknown command")
            print(error, flush=True)


if __name__ == "__main__":
    main()

    # Main.py: needs
    # to know if there is a file in the directory.
    # what user uploaded the file.
    #
    #             ts_name = input("Enter the TS_NAME: ")
    #             description = input("Enter the DESCRIPTION: ")
    #             domains = input("Enter the DOMAINS/HEADERS (comma-separated): ")
    #             units = input("Enter the UNITS (comma-separated): ")
    #             keywords = input("Enter the KEYWORDS (comma-separated): ")

    # 1. Update to read data from string manipulation.
    # 2.

    # checks -> return values/errors
    # saves/splits into train test raw data
    # converts to files png and saves in directory
