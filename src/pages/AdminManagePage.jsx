import { useMemo, useState } from 'react';
import '../styles/admin-manage.css';

export default function AdminManagePage({
  accounts,
  profiles,
  notifications,
  shipments,
  onResetPassword,
  onDeleteUser,
  onNavigateHome
}) {
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState('전체');
  const [toast, setToast] = useState(null);
  // 상세 정보 모달 상태
const [selectedUser, setSelectedUser] = useState(null);
const [showModal, setShowModal] = useState(false);


  // 정렬 상태
  const [sortField, setSortField] = useState('username');
  const [sortDirection, setSortDirection] = useState('asc');

  // 페이지네이션
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // 토스트 메시지 함수
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  // 🔍 검색 + 필터 적용된 rows
  const rows = useMemo(() => {
    return Object.entries(accounts)
      .map(([username, acc]) => ({
        username,
        role: acc.role,
        email: acc.email,
        nickname: profiles[username]?.nickname || acc.name,
        unread: (notifications[username] || []).filter((n) => !n.read).length
      }))
      .filter((row) => {
        const text = searchText.toLowerCase();
        const match =
          row.username.toLowerCase().includes(text) ||
          row.nickname.toLowerCase().includes(text) ||
          row.email.toLowerCase().includes(text) ||
          row.role.toLowerCase().includes(text);

        const roleMatch = roleFilter === '전체' || roleFilter === row.role;
        return match && roleMatch;
      });
  }, [accounts, profiles, notifications, searchText, roleFilter]);

  // 🔽 정렬 기능 적용
  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const A = a[sortField];
      const B = b[sortField];

      if (A < B) return sortDirection === 'asc' ? -1 : 1;
      if (A > B) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rows, sortField, sortDirection]);

  // 📄 페이지네이션 rows
  const paginatedRows = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return sortedRows.slice(start, start + itemsPerPage);
  }, [sortedRows, page]);

  // 정렬 버튼 클릭 시 동작
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleReset = (username) => {
    const result = onResetPassword(username, 'rewear123!');
    if (result.success) showToast(`${username} 비밀번호 초기화 완료!`);
    else showToast(`오류: ${result.message}`);
  };

  const handleDelete = (username) => {
    if (!window.confirm(`${username} 계정을 삭제하시겠습니까?`)) return;
    const result = onDeleteUser(username);
    if (result.success) showToast(`${username} 계정 삭제됨`);
    else showToast(`실패: ${result.message}`);
  };

  // ⭐ 회원 기부/수혜 내역 계산 함수
const getUserDonationStats = (user) => {
  if (!user || !shipments) return { count: 0, recent: [] };

  // 1) 일반 회원: sender(보낸 사람) 기준
  if (user.role === "일반 회원") {
    const sent = shipments.filter(s =>
      s.sender === user.nickname || s.sender === user.username
    );
    return {
      count: sent.length,
      recent: sent.slice(0, 3)
    };
  }

  // 2) 기관 회원: receiver(받은 기관) 기준
  if (user.role === "기관 회원") {
    const received = shipments.filter(s =>
      s.receiver === user.nickname || s.receiver === user.username
    );
    return {
      count: received.length,
      recent: received.slice(0, 3)
    };
  }

  // 3) 관리자 회원 → 기부/수혜 통계 없음
  return { count: 0, recent: [] };
};


  return (
    <div className="admin-manage-page">

      {/* 🔥 토스트 메시지 */}
      {toast && <div className="toast">{toast}</div>}

      <div className="admin-manage-header">
        <h1>회원 관리</h1>
        <button type="button" className="btn primary" onClick={() => onNavigateHome('/main')}>
          메인으로
        </button>
      </div>

      {/* 🔍 검색 + 필터 영역 */}
      <div className="admin-controls">
        <input
          type="text"
          placeholder="아이디, 닉네임, 이메일 검색..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />

        <select
          className="filter-select"
          value={roleFilter}
          onChange={(e) => {
            setPage(1); // 필터 변경 시 1페이지로 이동
            setRoleFilter(e.target.value);
          }}
        >
          <option>전체</option>
          <option>일반 회원</option>
          <option>기관 회원</option>
          <option>관리자 회원</option>
        </select>
      </div>

      <div className="admin-table-wrapper">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('username')}>아이디</th>
              <th onClick={() => handleSort('nickname')}>닉네임</th>
              <th onClick={() => handleSort('role')}>역할</th>
              <th onClick={() => handleSort('email')}>이메일</th>
              <th onClick={() => handleSort('unread')}>안읽은 알림</th>
              <th>관리</th>
            </tr>
          </thead>

          <tbody>
            {paginatedRows.map((row) => (
              <tr 
              key={row.username}
              className="user-row"
              onClick={() => { setSelectedUser(row); setShowModal(true); }}
            >
            
                <td>{row.username}</td>
                <td>{row.nickname}</td>

                {/* ⭐ 역할 배지 */}
                <td>
                <span className={`role-badge role-${row.role.replace(/\s+/g, '')}`}>
  {row.role}
</span>

                </td>

                <td>{row.email}</td>

                {/* ⭐ 알림 배지 */}
                <td>
                  <span className={`badge ${row.unread > 0 ? 'unread' : ''}`}>{row.unread}</span>
                </td>

                <td>
                  {row.username !== 'admin' ? (
                    <>
                      <button onClick={() => handleReset(row.username)} className="small-btn">
                        비밀번호 초기화
                      </button>
                      <button onClick={() => handleDelete(row.username)} className="small-btn danger">
                        삭제
                      </button>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📄 페이지네이션 버튼 */}
      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
        >
          이전
        </button>

        <span>{page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={paginatedRows.length < itemsPerPage}
        >
          다음
        </button>
      </div>
      {/* 📌 사용자 상세 보기 모달 */}
{showModal && selectedUser && (
  <div className="modal-overlay" onClick={() => setShowModal(false)}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2>회원 상세 정보</h2>

      <div className="modal-content">
        <p><strong>아이디:</strong> {selectedUser.username}</p>
        <p><strong>닉네임:</strong> {selectedUser.nickname}</p>
        <p><strong>역할:</strong> {selectedUser.role}</p>
        <p><strong>이메일:</strong> {selectedUser.email}</p>
        <p><strong>읽지 않은 알림:</strong> {selectedUser.unread} 개</p>
        {/* ⭐ 기부/수혜 내역 표시 */}
{(() => {
  const stats = getUserDonationStats(selectedUser);

  // 관리자 회원이면 표시 안 함
  if (selectedUser.role === "관리자 회원") {
    return null;
  }

  return (
    <>
      <hr style={{ margin: "12px 0" }} />
      <h3>📦 {selectedUser.role === "일반 회원" ? "기부한 횟수" : "받은 기부 횟수"}</h3>
      <p>{stats.count} 회</p>

      <h4>📌 최근 내역</h4>
      {stats.recent.length === 0 ? (
        <p>최근 내역이 없습니다.</p>
      ) : (
        <ul>
          {stats.recent.map((item, i) => (
            <li key={i}>
              {item.date} — {item.product || item.items} → {item.receiver}
            </li>
          ))}
        </ul>
      )}
    </>
  );
})()}

      </div>

      <div className="modal-buttons">
        {selectedUser.username !== 'admin' && (
          <>
            <button
              className="small-btn"
              onClick={() => {
                handleReset(selectedUser.username);
                setShowModal(false);
              }}
            >
              비밀번호 초기화
            </button>

            <button
              className="small-btn danger"
              onClick={() => {
                handleDelete(selectedUser.username);
                setShowModal(false);
              }}
            >
              삭제
            </button>
          </>
        )}

        <button className="small-btn" onClick={() => setShowModal(false)}>
          닫기
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
