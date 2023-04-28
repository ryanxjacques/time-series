"""
This file works as a listener and driver for all python files
"""

# !/usr/bin/python3

import os
import time
import mysql.connector
import config
import convert_data as cv
import graph_display as gd

cnx = mysql.connector.connect(user=os.environ.get("DB_USER"), password=os.environ.get("DB_PASS"),
                              host=os.environ.get("DB_HOST"),
                              database='users')


# upload dir: /var/www/html/uploads
def watch_directory():
    """
    Watch directory specified in config file, and save to separate files
    :return:
    """
    print("Entered watch directory")
    while True:
        for filename in os.listdir(config.watch_path):
            print("FOUND FILE IN DIRECTORY!!!!")
            # process the file
            file_ext = filename.split('.')[-1]
            supported = True

            # Check if file type is supported
            if file_ext not in cv.read_functions:
                supported = False
                print(f"Unsupported file type {file_ext}. Cannot access full capabilities of website "
                      f"(graphical display, DS/MLE forecasting support")

            # if file type is supported, read into pd.DataFrame
            if supported:
                data = cv.read_functions[file_ext](config.watch_path + filename)

            # Metadata
            print("Please enter in Metadata for the above file:")
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
            row = {'TS_NAME': ts_name, 'DESCRIPTION': description, 'DOMAINS': domains_str, 'UNITS': units_str,
                   'KEYWORDS': keywords_str}

            # # Write the row to the CSV file
            # # TODO: Connect to mySQL database and convert data there
            # with open('../../TestData/metadata-placeholder.csv', mode='w', newline='') as csv_file:
            #     writer = csv.DictWriter(csv_file, fieldnames=['TS_NAME', 'DESCRIPTION', 'DOMAINS', 'UNITS', 'KEYWORDS'])
            #     writer.writeheader()
            #     writer.writerow(row)
            #
            # #TODO: CONNECT TO CNX

            # Prepare the SQL statement for inserting a row into the table
            insert_sql = "INSERT INTO mytable (TS_NAME, DESCRIPTION, DOMAINS, UNITS, KEYWORDS) VALUES (%s, %s, %s, %s, %s)"

            # Create a cursor object to execute the SQL statement
            cursor = cnx.cursor()

            # Execute the SQL statement with the values from the dictionary
            cursor.execute(insert_sql,
                           (row['TS_NAME'], row['DESCRIPTION'], row['DOMAINS'], row['UNITS'], row['KEYWORDS']))

            # Commit the changes and close the database connection
            cnx.commit()
            cnx.close()

            print("Metadata saved to 'metadata-placeholder.csv'.")

            # Use metadata to clean formatting!
            try:
                data = cv.clean_headers(data, domains_str)
            except ValueError:
                print("Unable to clean data. Check formatting specifications.")
                supported = False
            # Catch errors by checking format. Prompt user to check their data again to remove white space/leading values, etc.
            if cv.check_data_format(data):
                cv.store_data(data)
                print(f"File {filename} converted to CSV and saved.\n"
                      f"Split into \"test\" and \"train\" files in the same directory.")

                # Using accepted format data and metadata, we can graphically display the contributors data using matplotlib
                if supported:
                    gd.graph()
                    print("Is this an accurate graphical representation of your data?")
                    accepted = user_input_bool()

                    if accepted:
                        print("Thank you for contributing to our repository! Have a great day!")
                    else:
                        print("We're sorry, we have format specifications that may have slipped through our system. "
                              "Please check our formatting specifications and try again")

                else:
                    # if not, store data and prompt user to submit data in the future. Warn about use of algorithm comparisons.
                    print("Supported file type, unsupported format. Please check to remove trailing 0s, white space, "
                          "and other interference. Data should be in the following format:\n"
                          "Header1\tHeader2\tHeader3\t\n Data1 \t Data2 \t Data3 \t\n"
                          " Data1 \t Data2 \t Data3 \t\n  ...  \t  ...  \t  ...  ")

                    # convert to csv and store in test/train/data placeholder

        time.sleep(1)  # wait for 1 second before checking again


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
            print("Invalid input. Please enter 'Y' or 'N'.")


def main():
    """
    Main driver for python module
    """
    watch_directory()


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