import HeaderLanding from '../components/HeaderLanding'
import { getNavLinksForRole } from '../constants/landingData'

export default function ExperienceLanding({
  onLogin = () => {},
  onSignup = () => {},
  onNavLink,
  isLoggedIn = false,
  onLogout = () => {},
  onNotifications = () => {},
  unreadCount = 0,
  onMenu = () => {},
  currentUser = null
}) {
  const navLinks = getNavLinksForRole(currentUser?.role)
  
  return (
    <section className="main-page experience-page soft-hero">
      <div className="main-shell">
        <HeaderLanding
          navLinks={navLinks}
          onLogin={onLogin}
          onNavClick={onNavLink}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          onNotifications={onNotifications}
          unreadCount={unreadCount}
          onMenu={onMenu}
        />

        <section className="warm-hero">
          <div className="hero-panel">
            {currentUser?.role === '관리자 회원' ? (
              <div className="admin-dashboard-banner">
                <div className="admin-banner-header">
                  <p className="hero-eyebrow">관리자 대시보드</p>
                  <h1>RE:WEAR 플랫폼 관리</h1>
                  <p className="admin-banner-subtitle">주요 관리 기능에 빠르게 접근하세요</p>
                </div>
                <div className="admin-quick-actions">
                  <button 
                    className="admin-action-card" 
                    onClick={() => onNavLink?.({ href: '/admin/organization-approval' })}
                  >
                    <div className="admin-action-icon">👥</div>
                    <div className="admin-action-content">
                      <strong>기관 계정 승인 대기</strong>
                      <p>새로운 기관 계정 승인 요청 확인</p>
                    </div>
                  </button>
                  <button 
                    className="admin-action-card" 
                    onClick={() => onNavLink?.({ href: '/admin/donation-approval' })}
                  >
                    <div className="admin-action-icon">📦</div>
                    <div className="admin-action-content">
                      <strong>기부 승인 대기</strong>
                      <p>새로운 기부 요청 승인 처리</p>
                    </div>
                  </button>
                  <button 
                    className="admin-action-card" 
                    onClick={() => onNavLink?.({ href: '/admin/manage' })}
                  >
                    <div className="admin-action-icon">📋</div>
                    <div className="admin-action-content">
                      <strong>회원 목록</strong>
                      <p>전체 회원 정보 조회 및 관리</p>
                    </div>
                  </button>
                  <button 
                    className="admin-action-card" 
                    onClick={() => onNavLink?.({ href: '/admin/faq' })}
                  >
                    <div className="admin-action-icon">❓</div>
                    <div className="admin-action-content">
                      <strong>FAQ 관리</strong>
                      <p>문의 답변 및 FAQ 관리</p>
                    </div>
                  </button>
                </div>
                <div className="admin-banner-footer">
                  <p>더 많은 기능은 <strong>카테고리 메뉴</strong>에서 확인하세요</p>
                </div>
              </div>
            ) : (
              <>
                <div className="hero-illustration" aria-hidden="true">
                  <img
                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1100&q=80"
                    alt="따뜻한 옷 나눔"
                  />
                </div>
                <div className="hero-info">
                  <p className="hero-eyebrow">지금 이 순간에도</p>
                  <h1>
                    RE:WEAR를 통해
                    <br />
                    따뜻한 옷이 전달되고 있어요.
                  </h1>
                  <ul className="impact-list">
                    <li>
                      <span>👕</span>
                      <div>
                        <strong>000벌</strong>
                        <p>지금까지 기부된 옷</p>
                      </div>
                    </li>
                    <li>
                      <span>🏫</span>
                      <div>
                        <strong>00곳</strong>
                        <p>함께하는 기관</p>
                      </div>
                    </li>
                    <li>
                      <span>🧑‍🤝‍🧑</span>
                      <div>
                        <strong>00명</strong>
                        <p>누적 참여자</p>
                      </div>
                    </li>
                  </ul>
                  <div className="hero-cta">
                    <button className="hero-btn light" onClick={() => onNavLink?.({ href: '/donation-status' })}>
                      나의 기부 현황 조회
                    </button>
                    <button className="hero-btn dark" onClick={onSignup}>
                      지금 바로 기부하기 📦
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="journey-section soft">
          <div className="section-header">
            <p className="eyebrow">Journey</p>
            <h3>옷이 도착하기까지의 짧은 여정</h3>
          </div>
          <div className="journey-cards">
            <article>
              <span>01</span>
              <h4>문 앞에서 수거</h4>
              <p>앱에서 신청하면 가장 가까운 파트너가 직접 방문합니다.</p>
            </article>
            <article>
              <span>02</span>
              <h4>정성스러운 검수</h4>
              <p>세탁과 분류를 거쳐 꼭 필요한 상태로 다시 준비됩니다.</p>
            </article>
            <article>
              <span>03</span>
              <h4>기관 연결</h4>
              <p>필요한 곳에 맞춰 자동 매칭되고 이동을 추적합니다.</p>
            </article>
          </div>
        </section>

        <section className="story-panel">
          <div className="story-text">
            <p className="hero-eyebrow">함께 바뀌는 일상</p>
            <h2>“아이들이 받은 패딩을 입고 바로 운동장으로 나갔어요.”</h2>
            <p>
              RE:WEAR는 기부자가 떠나보낸 옷과 기관이 꼭 필요로 하는 물품을 더 빠르게 연결합니다.
              기부자는 앱에서 진행 현황을 확인하고, 기관은 필요한 때 필요한 만큼만 받습니다.
            </p>
          </div>
          <div className="story-visual" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80"
              alt="감사 이야기"
            />
          </div>
        </section>

        <section className="cta-split cozy">
          <div>
            <p className="eyebrow">지금 바로</p>
            <h3>함께하면, 옷의 다음 주인이 조금 더 빨리 웃습니다.</h3>
          </div>
          <div className="cta-actions">
            <button className="btn primary" onClick={onSignup}>
              기부 이야기 시작하기
            </button>
            <button className="btn secondary" onClick={() => onNavLink?.({ href: '/donation-status' })}>
              내 기록 살펴보기
            </button>
          </div>
        </section>

        <footer className="landing-footer">
          <p>© {new Date().getFullYear()} RE:WEAR · 따뜻함이 이어지는 곳</p>
        </footer>
      </div>
    </section>
  )
}

