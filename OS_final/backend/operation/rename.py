import subprocess
from subprocess import call
import sys
import os

#Check argument is enough or not
if len(sys.argv)> 2:
	old_name= sys.argv[1]
	new_name= sys.argv[2]
else:
	quit()

#Extrct the path to file
i= len(new_name)
while i> 0:
	i-= 1
	if new_name[i]== '/':
		break
path= new_name[0: i+1]



old_name= old_name[i+ 1:]
new_name= new_name[i+ 1:]


#check if old name == new name 
if old_name== new_name:
	quit()

#find the old name exist or not

file_list= os.listdir(path)
if old_name not in file_list:
	quit()


#Decompose the name into filename and filename extension
begin= 0
file_name= new_name
file_extend= ''

index= new_name.find('.', begin)
while index!= -1:
	begin= index
	index= new_name.find('.', begin+ 1)

if begin:
	file_name= new_name[0: begin]
	file_extend= new_name[begin+ 1:]
if file_extend:
    new_name = file_name + '.' + file_extend

#Test the new name exist or not
if new_name not in file_list:
    call(['mv', path + old_name, path+new_name])

else:
	counter= 1
	while (file_name+ '_'+ str(counter)+ '.'+ file_extend) in file_list:
		counter+= 1
	if file_extend:
	    new_name= (file_name+ '_'+ str(counter)+ '.'+ file_extend)
	else:
	    new_name= (file_name+ '_'+ str(counter))
	call(['mv', path+old_name, path +new_name])

























