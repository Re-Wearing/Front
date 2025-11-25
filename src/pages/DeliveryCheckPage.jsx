import HeaderLanding from '../components/HeaderLanding'
import { mainNavLinks } from '../constants/landingData'

export default function DeliveryCheckPage({
  onNavigateHome,
  onNavLink,
  isLoggedIn,
  onLogout,
  onNotifications,
  unreadCount,
  onMenu = () => {}
}) {
  return (
    <section className="main-page delivery-check-page">
      <div className="main-shell delivery-check-shell">

        <HeaderLanding
          navLinks={mainNavLinks}
          onLogoClick={onNavigateHome}
          onNavClick={onNavLink}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          onNotifications={onNotifications}
          unreadCount={unreadCount}
          onMenu={onMenu}
        />

        <div className="delivery-check-content">
          <h1>배송 조회</h1>

          <div className="delivery-step-box">
            <p>1. 수거 요청 완료</p>
            <p>2. 수거 완료</p>
            <p>3. 배송 중</p>
            <p>4. 도착 완료</p>
          </div>

          <a
            className="delivery-track-button"
            href="https://tracker.delivery/"
            target="_blank"
            rel="noopener noreferrer"
          >
            택배사 배송조회 바로가기
          </a>
        </div>

      </div>
    </section>
  )
}
