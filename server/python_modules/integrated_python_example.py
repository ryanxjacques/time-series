"""
Author: Joseph
Date: 24 April 2023
Brief: A short example that shows how to communicate
       with the Node.js server from a python file.
"""
import sys  # Provides argv, and arg
import json  # Reads JSON format


class UsageError(Exception):
    pass


def foo(msg):
    print(f'foo says: {msg}')


def fee(msg):
    print(f'fee says: {msg}')


def bar(msg):
    print(f'bar says: {msg}')


def main():
    """
    Brief: On the Node.js server, we're using a library called 'python-shell'.
           This library allows for 'easier' bidirectional communication between
           python files and the server. All messages coming from the server
           to this file come in through stdin. Likewise, all messages that are
           sent from this python file (i.g from print statements) go out through
           stdout.

           Messages sent from the server should be a JSON string. This makes it
           easier to decode the messages into its relevant parts.

           Example of a JSON string:
               str = {"functionName": "foo", "arg": "Hello, world!"}

           where,
               str["functionName"] = "foo"
               str["arg"] = "Hello, world!"

           By using an if - elif - else block, we can design our own listeners.
           (see code)

    Usage Example:
           >> python3 integrated_python_example.py value_1 value_2 value_3
           Received: value_1
           Received: value_2
           Received: value_3
           >> {"functionName": "foo", "arg": "Hello, world!"}
           foo says: Hello, world!
           >> some invalid json string
           Error: Invalid JSON string
           -- END
    """
    # Note: argv[0] => /path/to/this/file.py
    # Check number of arguments passed to file.
    if len(sys.argv) != 4:
        raise UsageError('Error: Expecting three arguments')

    # Print each argument in argv except argv[0].
    for value in sys.argv[1:]:
        print(f'Received: {value}')

    # Continuously read from stdin.
    for line in sys.stdin:
        """
        This program will read from stdin for its entire lifespan. From stdin,
        it is expecting a JSON string. If the JSON string is valid, this program
        will do some operation. Otherwise, if the JSON string is invalid, the 
        program will terminate.
        """
        # Check if JSON string is valid.
        try:
            # Try to decode the JSON string.
            command = json.loads(line)
        except json.JSONDecodeError:
            # JSON data is invalid -> end the program.
            return print("Error: Invalid JSON string")

        # Process valid JSON string. (our listeners)
        if command['functionName'] == 'foo':
            foo(command['arg'])
        elif command['functionName'] == 'fee':
            fee(command['arg'])
        elif command['functionName'] == 'bar':
            bar(command['arg'])
        else:
            print('Error: unknown function')

    # Note:
    print("This message will never be seen!")


if __name__ == '__main__':
    main()
