import sys, os
import eyed3

# Apply a rename first so that it recognizes the file type
songfile = open(sys.argv[1], "w")

filename = sys.argv[1]
temporaryname = sys.argv[1] + ".mp3"

os.rename(filename, temporaryname)

# Getting Song Metadata
songmeta = eyed3.load(temporaryname)

# Printing metadata
print(songmeta)

# Hiding Changes
os.rename(temporaryname, filename)