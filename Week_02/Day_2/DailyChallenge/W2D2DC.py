import re
MATRIX_STR = '''
7ii
Tsx
h%?
i #
sM 
$a 
#t%''' 
matrix=[
    [7,'i','i'],
    ['T','s','x'],
    ['h','%','?'],
    ['i',' ','#'],
    ['s','M',' '],
    ['$','a',' '],
    ['#','t','%']
    ]
for column in zip(*matrix):
    print(column)
    