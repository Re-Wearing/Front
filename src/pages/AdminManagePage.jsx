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
  // 디버깅: props 확인 (개발 환경에서만)
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 AdminManagePage - shipments prop:', shipments);
    console.log('🔍 AdminManagePage - shipments type:', typeof shipments, 'isArray:', Array.isArray(shipments));
    console.log('🔍 AdminManagePage - accounts[user]:', accounts?.user);
  }
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
    // shipments가 배열인지 확인하고, 아니면 빈 배열로 처리
    const shipmentsArray = Array.isArray(shipments) ? shipments : [];
    
    // 디버깅: shipments 데이터 확인
    if (shipmentsArray.length > 0) {
      console.log('🔍 AdminManagePage - shipments:', shipmentsArray);
    } else {
      console.warn('⚠️ AdminManagePage - shipments가 비어있거나 배열이 아님:', shipments);
    }
    
    // 디버깅: 모든 accounts 확인
    console.log('🔍 모든 accounts:', Object.keys(accounts));
    console.log('🔍 accounts[user]:', accounts['user']);
    
    return Object.entries(accounts)
    .map(([username, acc]) => {
      const nickname = profiles[username]?.nickname || acc.name;
      
      // 디버깅: user 계정 정보
      if (username === 'user') {
        console.log('🔍 user 계정 발견!', { username, role: acc.role, name: acc.name, nickname });
      }
    
      // ⭐ 일반/기관 기부 횟수 계산
      let donationCount = 0;
    
      if (acc.role === "일반 회원") {
        // 모든 shipments의 sender와 비교 가능한 값들을 확인
        const accountName = String(acc.name || '').trim();
        const accountNickname = String(nickname || '').trim();
        const accountUsername = String(username || '').trim();
        
        donationCount = shipmentsArray.filter((s) => {
          if (!s || !s.sender) return false;
          
          const sender = String(s.sender || '').trim();
          
          // username이 'user'인 경우, sender가 '권석현'이면 매칭
          if (username === 'user' && sender === '권석현') {
            console.log(`✅ user 계정 매칭 성공! sender: "${sender}"`);
            return true;
          }
          
          // 일반적인 비교 로직
          const matches = sender === accountName || 
                         sender === accountNickname || 
                         sender === accountUsername;
          
          if (username === 'user') {
            console.log(`🔍 비교: sender="${sender}" vs name="${accountName}" nickname="${accountNickname}" username="${accountUsername}" → ${matches}`);
          }
          
          return matches;
        }).length;
        
        if (username === 'user') {
          console.log(`📊 최종 기부횟수: ${donationCount}회`);
        }
      }
    
      if (acc.role === "기관 회원") {
        donationCount = shipmentsArray.filter(
          (s) => {
            if (!s || !s.receiver) return false;
            const receiver = String(s.receiver || '').trim();
            const accountName = String(acc.name || '').trim();
            const accountNickname = String(nickname || '').trim();
            
            return receiver === accountName || 
                   receiver === accountNickname;
          }
        ).length;
      }
    
      return {
        username,
        role: acc.role,
        email: acc.email,
        nickname,
        unread: (notifications[username] || []).filter((n) => !n.read).length,
        donationCount   // ⭐ 새로 추가됨
      };
    })
    
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
  }, [accounts, profiles, notifications, searchText, roleFilter, shipments]);

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
    if (!user || !shipments || !Array.isArray(shipments)) return { count: 0, recent: [] };
    
    // accounts에서 실제 계정 정보 가져오기
    const account = accounts[user.username];
    if (!account) return { count: 0, recent: [] };

    // 1) 일반 회원: sender(보낸 사람) 기준
    if (user.role === "일반 회원") {
      const sent = shipments.filter(s => {
        if (!s || !s.sender) return false;
        const sender = String(s.sender || '').trim();
        
        // username이 'user'인 경우, sender가 '권석현'이면 매칭
        if (user.username === 'user' && sender === '권석현') {
          return true;
        }
        
        // 일반적인 비교 로직
        const accountName = String(account.name || '').trim();
        const userNickname = String(user.nickname || '').trim();
        const userUsername = String(user.username || '').trim();
        
        return sender === accountName ||
               sender === userNickname ||
               sender === userUsername;
      });
      return {
        count: sent.length,
        recent: sent.slice(0, 3)
      };
    }

    // 2) 기관 회원: receiver(받은 기관) 기준
    if (user.role === "기관 회원") {
      const received = shipments.filter(s =>
        s?.receiver === account.name ||
        s?.receiver === user.nickname
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
              <th onClick={() => handleSort('donationCount')}>기부 횟수</th>

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

                <td>{row.donationCount}</td>

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
        {selectedUser.role !== "관리자 회원" && (
          <>
            <hr style={{ margin: "12px 0" }} />
            <h3>📦 {selectedUser.role === "일반 회원" ? "기부한 횟수" : "받은 기부 횟수"}</h3>
            <p>{selectedUser.donationCount || 0} 회</p>

            <h4>📌 최근 내역</h4>
            {(() => {
              const stats = getUserDonationStats(selectedUser);
              return stats.recent.length === 0 ? (
                <p>최근 내역이 없습니다.</p>
              ) : (
                <ul>
                  {stats.recent.map((item, i) => (
                    <li key={i}>
                      {item.startDate || item.date} — {item.product || item.items} → {item.receiver}
                    </li>
                  ))}
                </ul>
              );
            })()}
          </>
        )}

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
