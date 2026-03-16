# The os module

# This module provides functions that wrap operating system functionality, manipulate files, 
# for example (the os module is relatively low level, for high-level operations on file and 
# directory handling, see the shutil module).

# It contains information about your operating system, for example, the name of your OS (os.name), 
# the current working directory (os.getcwd()) and even environment variables (os.environ). 

#Manipulating files and dirs

#The os module provide a lot of functions to manipulate your files and directories, starting by 
# listing them: you can use the os.scandir(directory) to get a list of all the entries in a 
# directory, or the os.walk(directory) to list files recursively (diving into every directory).

#You can also create directories (os.mkdir for a single directory or os.makedirs for multiple folders)
# , rename directories with os.rename or remove them with os.remove and os.removedirs. 