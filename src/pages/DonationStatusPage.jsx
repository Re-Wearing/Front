import { useEffect, useMemo, useState } from 'react'
import HeaderLanding from '../components/HeaderLanding'
import { mainNavLinks } from '../constants/landingData'

export default function DonationStatusPage({
  onNavigateHome,
  onNavLink,
  isLoggedIn,
  onLogout,
  onNotifications,
  unreadCount,
  onMenu = () => {},
  currentUser,
  onRequireLogin,
  shipments = []
}) {
  // 로그인하지 않았거나, 기관 회원이거나, 관리자인 경우 접근 불가
  if (!isLoggedIn || !currentUser) {
    if (onRequireLogin) {
      onRequireLogin()
    }
    return null
  }

  if (currentUser.role === '기관 회원' || currentUser.role === '관리자 회원') {
    if (onNavigateHome) {
      onNavigateHome()
    }
    return null
  }
  const isCompletedShipment = status => {
    if (!status) return false
    const normalized = String(status).replace(/\s+/g, '').toLowerCase()
    return normalized === '배송완료' || normalized === '완료' || normalized.endsWith('완료')
  }

  const donations = useMemo(
    () => {
      if (!currentUser) return []
      return (shipments || [])
        .filter(
          shipment =>
            isCompletedShipment(shipment.status) &&
            (!shipment.sender ||
              shipment.sender === currentUser.name ||
              shipment.sender === currentUser.nickname)
        )
        .map(shipment => ({
          id: shipment.id,
          date: shipment.startDate,
          items: shipment.product,
          organization: shipment.receiver,
          status: '완료'
        }))
    },
    [shipments, currentUser]
  )
  const [selectedItems, setSelectedItems] = useState(new Set())

  useEffect(() => {
    setSelectedItems(prev => {
      const next = new Set()
      donations.forEach(donation => {
        if (prev.has(donation.id)) {
          next.add(donation.id)
        }
      })
      return next
    })
  }, [donations])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleSelectAll = event => {
    if (event.target.checked) {
      setSelectedItems(new Set(donations.map(d => d.id)))
    } else {
      setSelectedItems(new Set())
    }
  }

  const handleSelectItem = (id, checked) => {
    const newSelected = new Set(selectedItems)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedItems(newSelected)
  }

  const isAllSelected = selectedItems.size === donations.length && donations.length > 0
  const isIndeterminate = selectedItems.size > 0 && selectedItems.size < donations.length

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDonations = donations.slice(startIndex, endIndex)
  const totalPages = Math.ceil(donations.length / itemsPerPage)

  const getStatusColor = status => {
    switch (status) {
      case '완료':
        return '#4eed90'
      case '배송중':
        return '#64d1ff'
      case '승인':
        return '#ffa500'
      case '대기':
        return '#ff6b6b'
      default:
        return '#7a6b55'
    }
  }

  return (
    <section className="main-page donation-status-page">
      <div className="main-shell donation-status-shell">
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

        <div className="donation-status-content">
          <div className="donation-status-header">
            <h1>기부 현황 조회</h1>
            <div className="donation-status-actions">
              <div className="donation-search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input type="search" placeholder="검색..." />
              </div>
              <button type="button" className="btn-cancel" onClick={onNavigateHome}>
                Cancel
              </button>
              <button type="button" className="btn-filter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filters
              </button>
            </div>
          </div>

          {donations.length === 0 ? (
            <div className="donation-status-empty">
              <p>아직 기부 내역이 없습니다.</p>
              <p>기부를 진행한 후 조회할 수 있습니다.</p>
            </div>
          ) : (
            <>
              <div className="donation-table-container">
                <table className="donation-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          ref={input => {
                            if (input) input.indeterminate = isIndeterminate
                          }}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>
                        기부 날짜 ↓
                      </th>
                      <th>
                        기부 내용 ↓
                      </th>
                      <th>수혜 기관 ↓</th>
                      <th>
                        기부 진행 상태 ↓
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDonations.map(donation => (
                      <tr key={donation.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedItems.has(donation.id)}
                            onChange={e => handleSelectItem(donation.id, e.target.checked)}
                          />
                        </td>
                        <td>{donation.date}</td>
                        <td>{donation.items}</td>
                        <td>{donation.organization}</td>
                        <td>
                          <span
                            className="donation-status-badge"
                            style={{ color: getStatusColor(donation.status) }}
                          >
                            {donation.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="donation-pagination">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  if (i === 4 && totalPages > 5) {
                    return (
                      <button key="ellipsis" type="button" className="pagination-ellipsis" disabled>
                        ...
                      </button>
                    )
                  }
                  const pageNum = i + 1
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      className={currentPage === pageNum ? 'active' : ''}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                {totalPages > 5 && (
                  <button
                    type="button"
                    className={currentPage === totalPages ? 'active' : ''}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

