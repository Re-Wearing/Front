import { useState, useMemo, useEffect } from 'react'
import HeaderLanding from '../components/HeaderLanding'
import { mainNavLinks, boardTypes, boardTabs, boardNotices, reviewPosts, requestPosts } from '../constants/landingData'

// 게시글에 content 필드 추가 (임시)
const getPostContent = (post) => {
  return post.content || `${post.title}에 대한 상세 내용입니다.`
}

export default function BoardPage({
  onNavigateHome = () => {},
  onLogin = () => {},
  onNavLink,
  isLoggedIn = false,
  onLogout = () => {},
  onNotifications = () => {},
  unreadCount = 0,
  onMenu = () => {},
  onGoToBoardWrite = () => {},
  currentUser = null,
  selectedBoardType: propSelectedBoardType = null,
  boardPosts = { review: [], request: [] },
  boardViews = {},
  onGoToBoardDetail = () => {}
}) {
  const [selectedBoardType, setSelectedBoardType] = useState('all')
  const [selectedSort, setSelectedSort] = useState('latest')
  const [searchInput, setSearchInput] = useState('') 
  const [searchQuery, setSearchQuery] = useState('') 
  const [searchScope, setSearchScope] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const POSTS_PER_PAGE = 10
  
  const parseDate = (dateString) => {
    if (!dateString) return new Date(0)
    const parts = dateString.split('.').map(Number)
    if (parts.length === 3) {
      return new Date(parts[0], parts[1] - 1, parts[2])
    }
    return new Date(dateString)
  }

  const filteredAndSortedPosts = useMemo(() => {
    let posts = []
    
    // 기본 상수 데이터와 작성된 게시글 합치기
    const reviewPostsWithNew = [...(boardPosts.review || []), ...reviewPosts]
    const requestPostsWithNew = [...(boardPosts.request || []), ...requestPosts]
    
    if (selectedBoardType === 'all') {
      posts = [...reviewPostsWithNew, ...requestPostsWithNew]
    } else if (selectedBoardType === 'review') {
      posts = [...reviewPostsWithNew]
    } else {
      posts = [...requestPostsWithNew]
    }
    
    // 조회수 업데이트 적용
    posts = posts.map(post => ({
      ...post,
      views: boardViews[post.id] !== undefined ? (post.views || 0) + boardViews[post.id] : post.views
    }))
    
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase()
      posts = posts.filter(post => {
        const matchesTitle = post.title.toLowerCase().includes(query)
        const matchesWriter = post.writer.toLowerCase().includes(query)
        
        switch (searchScope) {
          case 'title':
            return matchesTitle
          case 'writer':
            return matchesWriter
          case 'all':
          default:
            return matchesTitle || matchesWriter
        }
      })
    }
    
    posts.sort((a, b) => {
      switch (selectedSort) {
        case 'latest':
          return parseDate(b.date) - parseDate(a.date)
        case 'popular':
          return b.views - a.views
        case 'oldest':
          return parseDate(a.date) - parseDate(b.date)
        default:
          return 0
      }
    })
    
    return posts
  }, [selectedBoardType, selectedSort, searchQuery, searchScope, boardPosts, boardViews])

  const totalPages = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = filteredAndSortedPosts.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedBoardType, selectedSort, searchQuery, searchScope])
  
  const sortTabs = boardTabs

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(searchInput.trim())
    setCurrentPage(1)
  }

  const getPaginationButtons = () => {
    const buttons = []
    
    if (totalPages <= 1) {
      return []
    }

    buttons.push(1)

    if (currentPage <= 4) {
      for (let i = 2; i <= Math.min(4, totalPages - 1); i++) {
        buttons.push(i)
      }
      if (totalPages > 4) {
        buttons.push('...')
        buttons.push(totalPages)
      } else if (totalPages > 1) {
        buttons.push(totalPages)
      }
    } else if (currentPage >= totalPages - 3) {
      if (totalPages > 5) {
        buttons.push('...')
      }
      for (let i = Math.max(2, totalPages - 3); i <= totalPages; i++) {
        buttons.push(i)
      }
    } else {
      buttons.push('...')
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        buttons.push(i)
      }
      buttons.push('...')
      buttons.push(totalPages)
    }

    return buttons
  }

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
          <form className="board-search-container" onSubmit={handleSearch}>
            <select
              className="search-filter-select"
              value={searchScope}
              onChange={(e) => setSearchScope(e.target.value)}
            >
              <option value="all">제목+작성자</option>
              <option value="title">제목</option>
              <option value="writer">작성자</option>
            </select>
            <input
              type="search"
              className="board-search-input"
              placeholder="게시글 검색..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e)
                }
              }}
            />
            <button type="submit" className="search-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </form>
        </section>

        <div className="board-type-tabs">
          <button
            className={`board-type-tab ${selectedBoardType === 'all' ? 'active' : ''}`}
            type="button"
            onClick={() => setSelectedBoardType('all')}
          >
            전체 게시판
          </button>
          <button
            className={`board-type-tab ${selectedBoardType === 'review' ? 'active' : ''}`}
            type="button"
            onClick={() => setSelectedBoardType('review')}
          >
            기부 후기
          </button>
          <button
            className={`board-type-tab ${selectedBoardType === 'request' ? 'active' : ''}`}
            type="button"
            onClick={() => setSelectedBoardType('request')}
          >
            요청 게시판
          </button>
        </div>

        <div className="board-tabs-row">
          <div className="board-tabs">
            {sortTabs.map(tab => (
              <button
                key={tab.value}
                className={selectedSort === tab.value ? 'active' : ''}
                type="button"
                onClick={() => setSelectedSort(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="board-write"
            onClick={() => {
              if (!isLoggedIn) {
                onLogin()
              } else {
                onGoToBoardWrite({}, selectedBoardType === 'all' ? 'review' : selectedBoardType)
              }
            }}
          >
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
            <div 
              key={notice.id} 
              className="board-row notice"
              onClick={() => onGoToBoardDetail(notice.id, 'notice')}
              style={{ cursor: 'pointer' }}
            >
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

          {filteredAndSortedPosts.length === 0 ? (
            <div className="board-empty">
              <p>{searchQuery.trim() ? '검색 결과가 없습니다.' : '게시글이 없습니다.'}</p>
            </div>
          ) : (
            currentPosts.map((post, index) => {
              // 게시글 타입 결정 (reviewPosts에 있으면 review, requestPosts에 있으면 request)
              const postType = reviewPosts.some(p => p.id === post.id) ? 'review' : 
                              requestPosts.some(p => p.id === post.id) ? 'request' :
                              boardPosts.review.some(p => p.id === post.id) ? 'review' : 'request'
              
              return (
                <div 
                  key={post.id} 
                  className="board-row"
                  onClick={() => onGoToBoardDetail(post.id, postType)}
                  style={{ cursor: 'pointer' }}
                >
                  <span>{startIndex + index + 1}</span>
              <span className="board-title">{post.title}</span>
              <span>{post.writer}</span>
              <span>{post.views}</span>
              <span>{post.date}</span>
            </div>
              )
            })
          )}
        </div>

        {totalPages > 1 && (
        <div className="board-pagination">
            {getPaginationButtons().map((page, index) => (
              <button
                key={page === '...' ? `ellipsis-${index}` : page}
                type="button"
                className={page === currentPage ? 'active' : ''}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                disabled={page === '...'}
              >
                {page}
            </button>
          ))}
        </div>
        )}
      </div>
    </div>
  )
}

