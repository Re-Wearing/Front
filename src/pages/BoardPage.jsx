import HeaderLanding from '../components/HeaderLanding'
import { mainNavLinks, boardTabs, boardNotices, boardPosts } from '../constants/landingData'

export default function BoardPage({
  onNavigateHome = () => {},
  onLogin = () => {},
  onNavLink,
  isLoggedIn = false,
  onLogout = () => {},
  onNotifications = () => {},
  unreadCount = 0,
  onMenu = () => {}
}) {
  const tabs = boardTabs

  return (
    <div className="board-page">
      <div className="board-shell">
        <HeaderLanding
          navLinks={mainNavLinks}
          onLogoClick={onNavigateHome}
          onLogin={onLogin}
          onNavClick={onNavLink}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          onNotifications={onNotifications}
          unreadCount={unreadCount}
          onMenu={onMenu}
        />

        <section className="board-hero">
          <div>
            <h1>게시판</h1>
            <p>RE:WEAR 커뮤니티의 소식과 이야기를 확인하세요.</p>
          </div>
          <div className="board-search">
            <input type="search" placeholder="게시글 검색..." />
            <button type="button">검색</button>
          </div>
        </section>

        <div className="board-tabs-row">
          <div className="board-tabs">
            {tabs.map(tab => (
              <button key={tab.value} className={tab.active ? 'active' : ''} type="button">
                {tab.label}
              </button>
            ))}
          </div>
          <button type="button" className="board-write">
            글쓰기
          </button>
        </div>

        <div className="board-table">
          <div className="board-header">
            <span>번호</span>
            <span>제목</span>
            <span>작성자</span>
            <span>조회수</span>
            <span>날짜</span>
          </div>

          {boardNotices.map(notice => (
            <div key={notice.id} className="board-row notice">
              <span>
                <i className="board-icon" aria-hidden="true">
                  📌
                </i>
              </span>
              <span className="board-title">{notice.title}</span>
              <span>{notice.writer}</span>
              <span>{notice.views}</span>
              <span>{notice.date}</span>
            </div>
          ))}

          {boardPosts.map(post => (
            <div key={post.id} className="board-row">
              <span>{post.id}</span>
              <span className="board-title">{post.title}</span>
              <span>{post.writer}</span>
              <span>{post.views}</span>
              <span>{post.date}</span>
            </div>
          ))}
        </div>

        <div className="board-pagination">
          {['1', '2', '3', '4', '...', '99'].map(item => (
            <button key={item} type="button" className={item === '1' ? 'active' : ''}>
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

