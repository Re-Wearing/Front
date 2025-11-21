import { useState } from 'react'
import HeaderLanding from '../components/HeaderLanding'

export default function InquiryPage({
  onBack,
  onNavigateHome,
  onNavLink,
  isLoggedIn,
  onLogout,
  onNotifications,
  unreadCount,
  onSubmitInquiry = () => ({ success: true })
}) {
  const [message, setMessage] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    const trimmedMessage = message.trim()
    const trimmedEmail = contactEmail.trim()
    if (!trimmedMessage || !trimmedEmail) {
      setStatus('필수 정보를 모두 입력해주세요.')
      return
    }
    const result = onSubmitInquiry({
      message: trimmedMessage,
      email: trimmedEmail
    })
    if (!result.success) {
      setStatus(result.message || '문의 전송에 실패했습니다.')
      return
    }
    setStatus('문의가 전달되었습니다. 빠르게 답변 드릴게요.')
    setMessage('')
    setContactEmail('')
  }

  return (
    <section className="main-page inquiry-page">
      <div className="main-shell inquiry-shell">
        <HeaderLanding
          onLogoClick={onNavigateHome}
          onNavClick={onNavLink}
          onNotifications={onNotifications}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          unreadCount={unreadCount}
        />

        <article className="inquiry-card">
          <div className="inquiry-header">
            <button type="button" className="inquiry-back" onClick={onBack} aria-label="뒤로가기">
              ←
            </button>
            <h2>문의하기</h2>
          </div>
          <p className="inquiry-copy">
            궁금한 점이나 요청하실 사항을 남겨주시면 담당자가 빠르게 확인 후 답변 드립니다.
          </p>
          <form className="inquiry-form" onSubmit={handleSubmit}>
            <label htmlFor="inquiry-message">무슨 문제가 있으신가요? (필수)</label>
            <textarea
              id="inquiry-message"
              value={message}
              onChange={event => setMessage(event.target.value)}
              placeholder="내용을 자세히 적어주시면 더 정확한 안내가 가능합니다."
              required
            />

            <label htmlFor="inquiry-email">이메일 주소 (필수)</label>
            <input
              id="inquiry-email"
              type="email"
              value={contactEmail}
              onChange={event => setContactEmail(event.target.value)}
              placeholder="example@rewear.com"
              required
            />

            <button type="submit" className="btn primary">
              등록하기
            </button>
            {status && (
              <p className="inquiry-status" role="status">
                {status}
              </p>
            )}
          </form>
        </article>
      </div>
    </section>
  )
}

