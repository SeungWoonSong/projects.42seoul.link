import traceback
import datetime
import MakeData

try:
    # MakeData.py 실행 코드
    os.system('python3 /home/ubuntu/Site_Status/projects.42seoul.link/MakeData.py')
except Exception as e:
    now = datetime.datetime.now()
    filename = f"{now.strftime('%Y-%m-%d %H:%M:%S')}.log"
    with open(filename, 'w') as f:
      f.write(str(e))
