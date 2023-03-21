import { getRows } from '../lib/db';
import { useEffect } from 'react';

export async function getStaticProps() {
  let rows = null;
  try {
    const result = await getRows(); // 'getRows' 함수를 사용하도록 변경
    rows = result.map(row => ({
      ...row,
      start_time: row.start_time.toISOString(), // JSON 직렬화 가능한 형식으로 변경
      error_time: row.error_time,
      working_time: row.working_time,
      last_checked: row.last_checked.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    props: {
      rows: rows || null,
    },
    revalidate: 60 * 1,
  };
}



export default function Home({ rows }) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      window.location.reload();
    }, 30000); // 1분마다 새로고침
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <h1>데이터베이스 행 정보</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>사이트 이름</th>
            <th>시작 시간</th>
            <th>오류 횟수</th>
            <th>오류 시간</th>
            <th>작동 시간</th>
            <th>이전 작동 여부</th>
            <th>마지막 확인</th>
          </tr>
        </thead>
        <tbody>
          {rows && rows.map((row) => ( // rows가 존재하는지 확인
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.site_name}</td>
              <td>{row.start_time}</td>
              <td>{row.error_count}</td>
              <td>{row.error_time}</td>
              <td>{row.working_time}</td>
              <td>{row.prev_is_working ? '예' : '아니오'}</td>
              <td>{row.last_checked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
