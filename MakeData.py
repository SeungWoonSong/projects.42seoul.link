import mariadb
import time
from dotenv import load_dotenv
import os
from check import check_site


# 데이터베이스 연결 설정
conn = mariadb.connect(
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD'),
    host=os.getenv('DB_HOST')
    database=os.getenv('DB_DATABASE')
)
cur = conn.cursor()
# 데이터베이스 끝
with open('sites.txt', 'r') as f:
    site_names = f.read().splitlines()
# 필요하나 사이트 명들 호출
while True:
    for site_name in site_names:
        # 사이트 작동 여부 확인
        is_working = check_site(site_name)
        
        # 데이터베이스에서 이전 데이터 가져오기
        cur.execute("SELECT * FROM site_stats WHERE site_name=?", (site_name,))
        row = cur.fetchone()
        if row:
            error_count = row[2]
            error_time = row[3]
            working_time = row[4]
            prev_is_working = row[5]
            last_checked = row[6]
            if not is_working:
                if not prev_is_working:  # 연속적인 오류가 아닌 경우에만 error_count를 높임
                    error_count += 1
                error_time += 15
            else:
                working_time += 15
            cur.execute(
                "UPDATE site_stats SET error_count=?, error_time=?, working_time=?, prev_is_working=?, last_checked=NOW() WHERE site_name=?",
                (error_count, error_time, working_time, is_working, site_name)
            )
        else:
            if not is_working:
                cur.execute(
                    "INSERT INTO site_stats (site_name, start_time, error_count, error_time, working_time, prev_is_working, last_checked) VALUES (?, NOW(), 1, 15, 0, 0, NOW())",
                    (site_name,)
                )
            else:
                cur.execute(
                    "INSERT INTO site_stats (site_name, start_time, error_count, error_time, working_time, prev_is_working, last_checked) VALUES (?, NOW(), 0, 0, 15, 1, NOW())",
                    (site_name,)
                )
    
    conn.commit()  # 변경 사항 저장
    time.sleep(15)  # 15초 대기
