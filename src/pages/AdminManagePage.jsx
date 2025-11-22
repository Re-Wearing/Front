import { useMemo, useState } from 'react'

export default function AdminManagePage({
  accounts,
  profiles,
  notifications,
  onResetPassword,
  onDeleteUser,
  onNavigateHome,
  onManageFaqs
}) {
  const [resetMessage, setResetMessage] = useState('')

  const rows = useMemo(
    () =>
      Object.entries(accounts).map(([username, acc]) => ({
        username,
        role: acc.role,
        email: acc.email,
        nickname: profiles[username]?.nickname || acc.name,
        unread: (notifications[username] || []).filter(item => !item.read).length
      })),
    [accounts, profiles, notifications]
  )

  const handleReset = username => {
    const result = onResetPassword(username, 'rewear123!')
    setResetMessage(
      result.success ? `${username} 비밀번호가 rewear123! 로 초기화되었습니다.` : result.message || '실패했습니다.'
    )
  }

  const handleDelete = username => {
    if (!window.confirm(`${username} 계정을 삭제하시겠습니까?`)) return
    const result = onDeleteUser(username)
    setResetMessage(result.success ? `${username} 계정이 삭제되었습니다.` : result.message || '실패했습니다.')
  }

  return (
    <div className="admin-manage-page">
  <div className="admin-manage-header">
    <h1>회원 관리</h1>
    <div className="admin-manage-header-actions">
      {onManageFaqs ? (
        <button type="button" className="btn secondary" onClick={onManageFaqs}>
          문의 답변 관리
        </button>
      ) : null}
      <button type="button" className="btn primary" onClick={() => onNavigateHome('/main')}>
        메인으로
      </button>
    </div>
  </div>

      <p className="helper">{resetMessage}</p>

      <div className="admin-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>아이디</th>
              <th>닉네임</th>
              <th>역할</th>
              <th>이메일</th>
              <th>읽지 않은 알림</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.username}>
                <td>{row.username}</td>
                <td>{row.nickname}</td>
                <td>{row.role}</td>
                <td>{row.email}</td>
                <td>{row.unread}</td>
                <td>
                  {row.username !== 'admin' ? (
                    <>
                      <button type="button" onClick={() => handleReset(row.username)}>
                        비밀번호 초기화
                      </button>
                      <button type="button" className="danger" onClick={() => handleDelete(row.username)}>
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
    </div>
  )
}

