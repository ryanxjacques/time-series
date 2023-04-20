# Credit ChatGPT

import bcrypt

password = b'mysecretpassword'
pepper = b'mysecretpepper'
salt = bcrypt.gensalt()

# Concatenate the password and pepper value
password_with_pepper = password + pepper

# Hash the password with salt and pepper
hashed_password = bcrypt.hashpw(password_with_pepper, salt)

# Verify a password with salt and pepper
password_to_check = b'mysecretpassword'
password_with_pepper_to_check = password_to_check + pepper
if bcrypt.checkpw(password_with_pepper_to_check, hashed_password):
    print("Password is valid")
else:
    print("Password is invalid")