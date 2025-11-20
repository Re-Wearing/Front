import HeaderLanding from '../components/HeaderLanding'
import {
  mainNavLinks,
  experienceStats,
  experienceValueCards,
  experienceSteps
} from '../constants/landingData'

export default function ExperienceLanding({
  onLogin = () => {},
  onSignup = () => {},
  onMenu = () => {},
  onNavLink,
  isLoggedIn = false,
  onLogout = () => {},
  onNotifications = () => {},
  unreadCount = 0
}) {
  return (
    <section className="main-page">
      <div className="main-shell">
        <HeaderLanding
          navLinks={mainNavLinks}
          onLogin={onLogin}
          onMenu={onMenu}
          onNavClick={onNavLink}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          onNotifications={onNotifications}
          unreadCount={unreadCount}
        />

        <section className="hero-section" id="hero">
          <div className="hero-content">
            <p className="eyebrow">지속가능 패션 커뮤니티</p>
            <h2>RE:WEAR</h2>
            <p className="hero-lead">
              지속가능한 패션을 위한 중고 의류 거래 플랫폼, 리웨어에서 가치 있는 순환을
              시작해보세요.
            </p>
            <p className="hero-sub">지금 시작해보세요!</p>
            <div className="hero-stats">
              {experienceStats.map(item => (
                <div key={item.label} className="stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            {!isLoggedIn && (
              <div className="hero-cta-row">
                <button className="btn secondary" onClick={onLogin}>
                  로그인
                </button>
                <button className="btn secondary" onClick={onSignup}>
                  회원가입
                </button>
              </div>
            )}
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="visual-photo" />
            <div className="visual-note">
              <span>RE:WEAR</span>
              <p>오늘도 128벌의 옷이 새 삶을 시작했어요.</p>
            </div>
          </div>
        </section>

        <section id="mission" className="mission-panel">
          <div>
            <p className="eyebrow">Why RE:WEAR</p>
            <h3>지속 가능한 순환을 만드는 가장 쉬운 방법</h3>
          </div>
          <p>
            리웨어는 기부자의 시간을 절약하고, 기관에는 필요한 물품을 정확히 전달합니다. 투명한
            프로세스와 데이터 기반 매칭으로 패션 산업의 낭비를 줄이는 데 함께합니다.
          </p>
        </section>

        <section id="value" className="value-grid">
          {experienceValueCards.map(card => (
            <article key={card.title}>
              <p className="eyebrow">{card.title}</p>
              <p>{card.body}</p>
            </article>
          ))}
        </section>

        <section id="process" className="process-section">
          <div className="section-header">
            <p className="eyebrow">How it works</p>
            <h3>단계별로 모두가 편리하게</h3>
          </div>
          <ol className="process-list">
            {experienceSteps.map(step => (
              <li key={step.title}>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="cta-panel">
          <div>
            <p className="eyebrow">지금 바로</p>
            <h3>RE:WEAR와 함께 순환 패션 여정을 시작하세요</h3>
          </div>
          <button className="btn primary" onClick={onSignup}>
            무료 컨설팅 신청
          </button>
        </section>

        <footer className="landing-footer">
          <p>© {new Date().getFullYear()} RE:WEAR. Sustainable fashion for everyone.</p>
        </footer>
      </div>
    </section>
  )
}

