import os

try:
    script_dir = os.path.dirname(os.path.abspath(__file__))
    words_file = os.path.join(script_dir, 'test.txt')
    with open(words_file, mode='r') as my_file:
        my_file.seek(0)
        print(my_file.read())
        my_file.close()
except FileNotFoundError as e:
    print(f'The file is not found')