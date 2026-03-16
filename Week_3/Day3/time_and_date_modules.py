
#Time and Datetime modules
#Table of Contents

     #   What you will learn:
     #       Time
     #       Datetime

#Last Updated: September 22nd, 2023

#What you will learn:

  #  time module
  #  datetime module


# Time

# The builtin time module deals with python time using seconds. It’s based on the epoch time, 
# which is the number of seconds that have passed since 01.01.1970.

# To get the number of seconds since the epoch, you can use the time.time() function. 
# This function can be handy to time your code for example, if you want to know how long a 
# snippet took to execute, compute the difference between time.time() before and time.time() after:

import time

before = time.time()
long_number = 1000**1000
after = time.time()

print(f"It took {after - before} seconds to execute 1000**1000")


#This module can also be used to make pauses in your program, using the time.sleep(seconds) function;
#  this function will pause your program for the number of seconds passed in the argument.

#Datetime

#The datetime module is a bit more high-level than the time module, it deals with human dates and times (with months, years and hours..), this module is also timezone-aware.

#The main objects of datetime are the Date and Datetime object, representing date and datetime. A datetime is just a date with information about the hours, minutes, and seconds. They actual date/datetime can be retrieved with the respective functions datetime.date.today() and datetime.datetime.now().

#They all contain time-relative attributes like day, month, hour, minute, etc..

#You can also apply date and datetimes (for example if you want to add days or hours to it) with it
#  datetime.timedelta object.

#For example, here is a snippet that prints the date of today and the date in 15 hours and 10 minutes:

import datetime

today_date = datetime.date.today()
actual_datetime = datetime.datetime.now()
in_15_hours = actual_datetime + datetime.timdelta(hours=15, minutes=10)

print(f"Today is the {today_date.day}/{today_date.month}")
print(f"In 15 hours and 10 minutes it will be the {in_15_hours.day}/{in_15_hours.month}")


#You can use the strftime (it stands for “string format time”) to format the output of your datetime.
#  It takes a string with placeholders as an argument and returns a pretty formatted date. You can 
# find a list of all the placeholders here.

#Let’s take the previous example, but this time using strftime.

import datetime

today_date = datetime.date.today()
actual_datetime = datetime.datetime.now()
in_15_hours = actual_datetime + datetime.timdelta(hours=15, minutes=10)

print(f"Today is the {today_date.strftime("%d/%m")}")
print(f"In 15 hours and 10 minutes it will be the {in_15_hours.strftime("%d/%m")}")


#The opposite function strptime (string parse time) can be used to convert a formatted string into a date, just by providing its format:

from datetime
string_date = "10/09/2020"

dt = datetime.strptime(string_date, "%d/%m/%Y")


