import { getRows } from '../lib/db';

export async function getStaticProps() {
  const rows = await getRows();
  return {
    props: {
      rows,
    },
  };
}

export default function Home({ rows }) {
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
          {rows.map((row) => (
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
