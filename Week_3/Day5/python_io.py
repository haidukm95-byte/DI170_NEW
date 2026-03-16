f=open('C:\M.HAIDUK\DOCUMENTS\STUDIES\DEV COURSE\DI_Bootcamp\Week_3\Day5\secrets.txt', 'r')
# 'r' to just read a file
# 'w' to write a file
# 'a' to append to the file
secret_data=f.read()
print(secret_data)
f.close()

# We should to go to the file`s directory 
# to have the secrets.txt file opened
#OR to state its full path

# By default, the open() function will only allow us to read the file. We need to pass the 
# argument 'w' to write over the file

# Add a second argument to the function, 'w' which stands for write.
# Passing 'w+' lets us read and write to the file
#g=open('C:\M.HAIDUK\DOCUMENTS\STUDIES\DEV COURSE\DI_Bootcamp\Week_3\Day5\secrets.txt', 'w+')

#Opening a file with 'w' or 'w+' truncates the original, meaning that 
# anything that was in the original file is deleted!

#g.write('but I normally eat lettuce')
#The changes appear into the file by itself!

#g.close()

#If the file doesn`t exist, it automatically gets created by Python!

#Appending to a File
#Passing the argument 'a' opens the file and puts the pointer at the end, 
# so anything written is appended. Like 'w+', 'a+' lets us read and write to a file. 
# If the file does not exist, one will be created.

#h=open('C:\M.HAIDUK\DOCUMENTS\STUDIES\DEV COURSE\DI_Bootcamp\Week_3\Day5\secrets.txt', 'a+')
#h.write('\nThis is text being appended to test.txt')
#h.write('\nAnd another line here.')
#h.close()

#try:
 #  f = open("C:\M.HAIDUK\DOCUMENTS\STUDIES\DEV COURSE\DI_Bootcamp\Week_3\Day5\secrets.txt",encoding = 'utf-8')
   # perform file operations
#finally:
#   f.close()

#f = open('C:\M.HAIDUK\DOCUMENTS\STUDIES\DEV COURSE\DI_Bootcamp\Week_3\Day5\secrets.txt', 'w')
#for i in range(10):
#    f.write("this is line: %i\n"%i)
#f.close()

# Same as
#with open('C:\M.HAIDUK\DOCUMENTS\STUDIES\DEV COURSE\DI_Bootcamp\Week_3\Day5\secrets.txt', 'w') as f:
 #   for i in range(10):
  #     f.write("this is line: %i\n"%i)

#Iterating through a File:
#for line in open('C:\M.HAIDUK\DOCUMENTS\STUDIES\DEV COURSE\DI_Bootcamp\Week_3\Day5\secrets.txt'):
  #  print(line)

#with open('C:\M.HAIDUK\DOCUMENTS\STUDIES\DEV COURSE\DI_Bootcamp\Week_3\Day5\secrets.txt', 'r') as f:
 #   f.readline(3)

# Common methods:
#f.read() 
#f.readline() # Reads one entire line from the file. Reads a file till the newline
#f.readlines() # Reads a file line by line, returns a list of the lines in the file

#f.write(str) 
#f.writelines(seq) # Writes a list of lines to the file.
# Example : 
# lines=["Hello world.\n", "Welcome to Paris.\n"]
# f.writelines(lines)

#f.seek(offset)   
#f.tell() # for binary files, mostly

#f.close()

# We can change our current file cursor (position) using the seek() method. Similarly, the tell() method returns our current position (in number of bytes).
f=open('C:\M.HAIDUK\DOCUMENTS\STUDIES\DEV COURSE\DI_Bootcamp\Week_3\Day5\secrets.txt', 'r')
f.tell()    # get the current file position

f.seek(0)   # bring file cursor to initial position
f.seek(6)  # bring file cursor to the 6th position
# If the file contains "Hello World", the cursor will start at "W"
f.close()