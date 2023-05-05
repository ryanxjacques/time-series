"""
Team: Time Lords
Author(s): Joseph Erlinger
Last Modified: 4/27/2023
"""

import sys
import json


def jsonify(name, message):
    """Transform python dict into json string"""
    temp_dict = dict()
    temp_dict["name"] = name
    temp_dict[name] = message
    json_string = json.dumps(temp_dict)
    return json_string


def main():
    for line in sys.stdin:
        try:
            command = json.loads(line)
        except json.JSONDecodeError:
            error = jsonify("error", "Invalid JSON string")
            print(error)
            continue

        if "op" not in command:
            error = jsonify("error", "Missing operation name")
            print(error)

        elif "arg" not in command:
            error = jsonify("error", "Missing argument")
            print(error)

        elif command["op"] == "test":
            result = jsonify("message", command["arg"])
            print(result, flush=True)

        else:
            error = jsonify("error", "Unknown op")
            print(error)


if __name__ == '__main__':
    main()

