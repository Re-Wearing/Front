import { useEffect, useState } from 'react'
import HeaderLanding from '../components/HeaderLanding'
import { mainNavLinks } from '../constants/landingData'

const EyeIcon = ({ crossed = false }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 5C6 5 1.73 9.11.05 12c1.68 2.89 5.95 7 11.95 7s10.27-4.11 11.95-7C22.27 9.11 18 5 12 5Zm0 12a5 5 0 1 1 5-5 5 5 0 0 1-5 5Z" />
    {crossed ? <path d="m3 4.27 16.73 16.73L18 22.73 1.27 6Z" /> : null}
  </svg>
)

export default function LoginPage({
  onNavigateHome = () => {},
  onGoSignup = () => {},
  onNavLink = () => {},
  onLoginSubmit = () => ({ success: false }),
  isLoggedIn = false,
  onLogout = () => {},
  onNotifications = () => {},
  onForgotPassword = () => {},
  onForgotId = () => {},
  unreadCount = 0,
  onMenu = () => {}
}) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [form, setForm] = useState({ username: '', password: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('rewearRememberId')
      if (saved) {
        setForm(prev => ({ ...prev, username: saved }))
        setRememberMe(true)
      }
    }
  }, [])

  const toggle = () => setPasswordVisible(prev => !prev)

  const handleChange = event => {
    const { name, value } = event.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = event => {
    event?.preventDefault()
    const result = onLoginSubmit(form.username, form.password)
    if (result?.success) {
      if (typeof window !== 'undefined') {
        if (rememberMe) {
          window.localStorage.setItem('rewearRememberId', form.username.trim())
        } else {
          window.localStorage.removeItem('rewearRememberId')
        }
      }
      setMessage('환영합니다! 잠시 후 메인으로 이동합니다.')
      setTimeout(() => {
        onNavigateHome()
      }, 800)
    } else {
      setMessage('아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  return (
    <div className="login-page">
      <div className="auth-shell">
        <HeaderLanding
          navLinks={mainNavLinks}
          onLogoClick={onNavigateHome}
          onLogin={() => {}}
          onNavClick={onNavLink}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          onNotifications={onNotifications}
          unreadCount={unreadCount}
          onMenu={onMenu}
        />

        <section className="auth-stage">
          <div className="login-card">
            <h1>Log In to RE:WEAR</h1>

            <form className="login-form" onSubmit={handleSubmit}>
              <label className="form-field" htmlFor="login-username">
                <span>아이디</span>
                <input
                  id="login-username"
                  name="username"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={form.username}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field" htmlFor="login-password">
                <span>비밀번호</span>
                <div className="password-field">
                  <input
                    id="login-password"
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="비밀번호를 입력하세요"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className={`password-eye ${passwordVisible ? 'active' : ''}`}
                    onClick={toggle}
                    aria-label={passwordVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
                  >
                    <EyeIcon crossed={passwordVisible} />
                  </button>
                </div>
              </label>

              <div className="login-meta">
                <label className="terms-row">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={event => setRememberMe(event.target.checked)}
                  />
                  <span>Remember Me</span>
                </label>
                <div className="login-links">
                  <button type="button" className="link-button" onClick={onForgotId}>
                    Forgot ID
                  </button>
                  <button type="button" className="link-button" onClick={onForgotPassword}>
                    Forgot Password?
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-button">
                Login
              </button>

              <p className={`login-message ${message && message.includes('환영') ? 'success' : ''}`}>
                {message}
              </p>

              <p className="login-footer">
                아직 계정이 없으신가요?{' '}
                <button type="button" className="link-button" onClick={onGoSignup}>
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

