from random import choice
from string import *
from random import randrange
def generate_password(length: int = 8):
    output_password = ""
    for i in range(length):
        output_password += choice(ascii_lowercase + ascii_uppercase + digits)

    return output_password

def generate_login(pupil_username: str):
    stroka = pupil_username.split()
    usernamae = f'{stroka[0]}{stroka[1][0]}{randrange(100)}'
    return usernamae
