export default function CategoryMenu({ isOpen, onClose, onNavClick }) {
  if (!isOpen) return null

  const menuCategories = [
    {
      title: '기부하기',
      items: [
        { label: '기부하기', href: '#donation' },
        { label: '게시판', href: '#board' }
      ]
    },
    {
      title: '마이페이지',
      items: [
        { label: '마이페이지', href: '#mypage' },
        { label: '기부 현황 조회', href: '/donation-status', action: 'donation-status' }
      ]
    },
      {
        title: 'FAQ',
        items: [
          { label: 'FAQ', href: '/faq', action: 'FaqPage' },
          { label: '문의하기', href: '/inquiry', action: 'InquiryPage' }
        ]
      }
  ]

  const handleNavClick = (event, item) => {
    event.preventDefault()
    if (onNavClick) {
      onNavClick({ href: item.href, label: item.label })
    }
    onClose()
  }

  return (
    <>
      <div className="category-menu-overlay" onClick={onClose} />
      <div className="category-menu">
        <div className="category-menu-header">
          <h3>카테고리</h3>
          <button type="button" className="category-menu-close" onClick={onClose} aria-label="메뉴 닫기">
            ×
          </button>
        </div>
        <div className="category-menu-content">
          {menuCategories.map((category, index) => (
            <div key={index} className="category-menu-column">
              <h4 className="category-menu-column-title">{category.title}</h4>
              <nav className="category-menu-column-nav">
                {category.items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href={item.href}
                    className="category-menu-item"
                    onClick={event => handleNavClick(event, item)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

