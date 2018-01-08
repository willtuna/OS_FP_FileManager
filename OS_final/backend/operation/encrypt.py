import subprocess
import sys
zp = subprocess.call(['7z', 'a', sys.argv[1], sys.argv[2], '-p'+sys.argv[3]])