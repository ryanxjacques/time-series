"""
Author: Joseph
Bcrypt docs: https://pypi.org/project/bcrypt/

Brief:
"""
import sys
import bcrypt
import json

# Get pepper via command-line argument.
PEPPER = sys.argv[1].encode('utf-8')


def hash_password(password):
    """Encrypt password with one-way hash using both salt and pepper"""
    password = password.encode('utf-8')
    peppered_password = password + PEPPER

    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(peppered_password, salt)
    hashed_password = hashed_password.decode()

    return hashed_password


def verify_password(password, hashed_password):
    """Check whether password pairs with hashed password"""
    password = password.encode('utf-8')
    hashed_password = hashed_password.encode('utf-8')
    peppered_password = password + PEPPER
    return bcrypt.checkpw(peppered_password, hashed_password)


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

        elif command["op"] == "hash password":
            hashed_password = hash_password(command["arg"])
            result = jsonify("hashed_password", hashed_password)
            print(result, flush=True)

        elif command["op"] == "verify password":
            authenticate = verify_password(command["arg"][0], command["arg"][1])
            result = jsonify("access", authenticate)
            print(result, flush=True)

        else:
            error = jsonify("error", "Unknown op")
            print(error)


if __name__ == '__main__':
    main()
