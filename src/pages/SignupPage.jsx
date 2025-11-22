import { useMemo, useState } from 'react'
import HeaderLanding from '../components/HeaderLanding'
import { mainNavLinks, membershipOptions, membershipForms } from '../constants/landingData'

const EyeIcon = ({ crossed = false }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 5C6 5 1.73 9.11.05 12c1.68 2.89 5.95 7 11.95 7s10.27-4.11 11.95-7C22.27 9.11 18 5 12 5Zm0 12a5 5 0 1 1 5-5 5 5 0 0 1-5 5Z" />
    {crossed ? <path d="m3 4.27 16.73 16.73L18 22.73 1.27 6Z" /> : null}
  </svg>
)

export default function SignupPage({
  onNavigateHome = () => {},
  onGoLogin = () => {},
  onNavLink = () => {},
  isLoggedIn = false,
  onLogout = () => {},
  onNotifications = () => {},
  unreadCount = 0,
  onMenu = () => {}
}) {
  const [membership, setMembership] = useState(membershipOptions[0].value)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(true)

  const fields = useMemo(() => membershipForms[membership] ?? [], [membership])

  const togglePassword = () => setPasswordVisible(prev => !prev)

  return (
    <div className="signup-page">
      <div className="signup-shell">
        <HeaderLanding
          navLinks={mainNavLinks}
          onLogoClick={onNavigateHome}
          onLogin={onGoLogin}
          onNavClick={onNavLink}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          onNotifications={onNotifications}
          unreadCount={unreadCount}
          onMenu={onMenu}
        />

        <section className="signup-stage">
          <div className="signup-card">
            <h1>Sign up to RE:WEAR</h1>

            <div className="membership-select">
              <label htmlFor="membership">회원 유형</label>
              <select
                id="membership"
                value={membership}
                onChange={event => {
                  setMembership(event.target.value)
                  setPasswordVisible(false)
                }}
              >
                {membershipOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <form className="signup-form">
              {fields.map(field => {
                if (field.toggleable) {
                  return (
                    <label key={field.id} className="form-field" htmlFor={`${field.id}-${membership}`}>
                      <span>{field.label}</span>
                      <div className="password-field">
                        <input
                          id={`${field.id}-${membership}`}
                          type={passwordVisible ? 'text' : 'password'}
                          placeholder={field.placeholder}
                        />
                        <button
                          type="button"
                          className={`password-eye ${passwordVisible ? 'active' : ''}`}
                          onClick={togglePassword}
                          aria-label={passwordVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
                        >
                          <EyeIcon crossed={passwordVisible} />
                        </button>
                      </div>
                    </label>
                  )
                }

                const inputId = `${field.id}-${membership}`
                const isReadOnly = Boolean(field.readOnly)

                return (
                  <label key={field.id} className="form-field" htmlFor={inputId}>
                    <span>{field.label}</span>
                    <div className="form-field-control">
                      <input
                        id={inputId}
                        type={field.type}
                        placeholder={field.placeholder}
                        readOnly={isReadOnly}
                        disabled={isReadOnly}
                        value={isReadOnly ? field.readOnlyValue || field.placeholder : undefined}
                      />
                      {field.actionLabel ? (
                        <button type="button" className="inline-action">
                          {field.actionLabel}
                        </button>
                      ) : null}
                    </div>
                    {field.helper ? <small>{field.helper}</small> : null}
                  </label>
                )
              })}

              <label className="terms-row">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={event => setAgreeTerms(event.target.checked)}
                />
                <span>
                  I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
                </span>
              </label>

              <button type="button" className="submit-button" disabled={!agreeTerms}>
                CREATE AN ACCOUNT
              </button>

              <p className="signup-footer">
                이미 계정이 있으신가요?{' '}
                <button type="button" className="link-button" onClick={onGoLogin}>
                  Login
                </button>
              </p>
              <p className="signup-meta">© {new Date().getFullYear()} · RE:WEAR · All Rights Reserved.</p>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

