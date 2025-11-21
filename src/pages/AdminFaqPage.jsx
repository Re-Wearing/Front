import { useState } from 'react'
import HeaderLanding from '../components/HeaderLanding'

export default function AdminFaqPage({
  onNavigateHome,
  onNavLink,
  onNotifications,
  isLoggedIn,
  onLogout,
  unreadCount,
  onBackToAdmin,
  adminInquiries = [],
  onSubmitAnswer = () => {}
}) {
  const [responses, setResponses] = useState({})

  const handleChange = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = id => {
    const text = responses[id]?.trim()
    if (!text) return
    onSubmitAnswer(id, text)
  }

  return (
    <section className="main-page admin-faq-page">
      <div className="main-shell admin-faq-shell">
        <HeaderLanding
          onLogoClick={onNavigateHome}
          onNavClick={onNavLink}
          onNotifications={onNotifications}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          unreadCount={unreadCount}
        />

        <article className="admin-faq-panel">
          <header className="admin-faq-header">
            <button type="button" className="admin-faq-back" onClick={onBackToAdmin} aria-label="뒤로가기">
              ←
            </button>
            <div>
              <p className="eyebrow">관리자 전용</p>
              <h2>문의 답변 관리</h2>
              <p>
                접수된 문의를 확인하고 담당자가 답변을 등록하면 이용자에게 빠르게 안내가 가능합니다.
              </p>
            </div>
          </header>

          {adminInquiries.length === 0 ? (
            <p className="admin-empty">등록된 문의가 없습니다.</p>
          ) : (
            <div className="admin-inquiry-grid">
              {adminInquiries.map(inquiry => {
                const isAnswered = inquiry.status === 'answered'
                return (
                  <article
                    key={inquiry.id}
                    className={`admin-inquiry-card${isAnswered ? ' answered' : ''}`}
                  >
                    <div className="admin-inquiry-meta">
                      <span className="admin-chip">{inquiry.role}</span>
                      <span>{inquiry.submittedAt}</span>
                    </div>
                    <h3>{inquiry.question}</h3>
                    <p>{inquiry.description}</p>

                    <textarea
                      className="admin-answer"
                      placeholder="답변 내용을 등록하고 답변 등록 버튼을 눌러주세요."
                      value={responses[inquiry.id] ?? inquiry.answer ?? ''}
                      onChange={event => handleChange(inquiry.id, event.target.value)}
                    />

                    <div className="admin-inquiry-actions">
                      <button type="button" className="btn primary" onClick={() => handleSubmit(inquiry.id)}>
                        답변 등록하기
                      </button>
                      <span className="admin-status">{isAnswered ? '답변 완료' : '답변 대기 중'}</span>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </article>
      </div>
    </section>
  )
}

