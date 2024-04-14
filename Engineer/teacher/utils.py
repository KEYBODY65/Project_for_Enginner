import base64


def encoding_file(file_name):
    with open(file_name, 'rb') as f:
        encodet_file = base64.b64encode(f.read()).decode()
    return encodet_file
