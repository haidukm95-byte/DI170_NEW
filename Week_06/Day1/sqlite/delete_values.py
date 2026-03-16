#Deleting table values

import sqlite3
conn = sqlite3.connect('my_database.sqlite')
cursor = conn.cursor()
conn.execute("DELETE from  SCHOOL where ID = 2")
conn.commit()
conn.close()