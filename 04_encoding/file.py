import base64

input_string = 'I am encoding!'
base64_encoded = base64.b64encode(input_string.encode())
utf8_encoded = input_string.encode('utf-8')

print('Base64 encoded', base64_encoded)
print('utf8 encoded', utf8_encoded)
print()

decode_utf8 = utf8_encoded.decode()
decode_base64 = base64_encoded.decode()

print('Base64 Decoded:', decode_base64)
print('UTF-8 Decoded:', decode_utf8)


