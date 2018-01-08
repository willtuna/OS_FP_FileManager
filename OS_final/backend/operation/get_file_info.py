import sys,os,time
print  '{  "fileName":"'+ os.path.basename(sys.argv[1]) +'",'
if os.path.splitext(sys.argv[1])[-1].__len__() == 0 : 
    print '"fileType" : "undefine",'
else: 
    print '"fileType":"'+ os.path.splitext(sys.argv[1])[-1] +'",'

print '"path":"'+ os.path.abspath(sys.argv[1])     +'",'
print '"size":"'+ str(os.path.getsize(sys.argv[1]))+'",'
f = sys.argv[1]
mtime = time.ctime(os.path.getctime(f)+28800)
ctime = time.ctime(os.path.getctime(f)+28800)
print '"lastModifiedTime":"'+ mtime.__str__() +'",'
print '"lastCreatedTime":"'+ ctime.__str__() +'" }'

