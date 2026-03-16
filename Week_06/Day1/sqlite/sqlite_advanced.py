#SQLite is a simple relational database system, which saves its data in regular data files

#Download and install “MySQL Connector”:

#C:\Users\Your Name\AppData\Local\Programs\Python\Python36-32\Scripts>python -m pip install mysql-connector

#To test if the installation was successful, or if you already have “MySQL Connector” installed, create a Python page with the following content:

demo_mysql_test.py:
import mysql.connector

#To use a database, you have to create first a connection object.
#The connection object will represent the database.

import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword"
)

print(mydb)

#Create a Database
#Now you can start querying the database using SQL statements.
#To create a database in MySQL, use the “CREATE DATABASE” statement:
#Create a database named “mydatabase”:

import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword"
)

mycursor = mydb.cursor()

mycursor.execute("CREATE DATABASE mydatabase")

#Try connecting to the database “mydatabase”:

import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  passwd="yourpassword",
  database="mydatabase"
)

