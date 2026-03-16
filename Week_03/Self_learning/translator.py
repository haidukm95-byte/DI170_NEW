from translate import Translator
translator=Translator(to_lang='zu')
try:
    with open('./test.txt', mode='r') as my_file:
        text = my_file.read()
        translation=translator.translate(text)
        print(translation)
except FileNotFoundError as e:
    print('The file is not found.')