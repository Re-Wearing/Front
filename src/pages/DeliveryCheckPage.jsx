import HeaderLanding from "../components/HeaderLanding"
import { mainNavLinks } from "../constants/landingData"

export default function DeliveryCheckPage({
  onNavigateHome,
  onNavLink,
  isLoggedIn,
  onLogout,
  onNotifications,
  unreadCount,
  onMenu = () => {}
}) {
  const data = [
    {
      id: "20240917-01",
      product: "양털후리스 외 2개",
      sender: "홍길동",
      startDate: "2024/09/17",
      receiver: "오가닉재단",
      status: "배송완료",
      link: "https://tracker.delivery/"
    },
    {
      id: "20240917-02",
      product: "원피스 외 3개",
      sender: "홍길동",
      startDate: "2024/09/17",
      receiver: "오가닉재단",
      status: "배송중",
      link: "https://tracker.delivery/"
    },
    {
      id: "20240917-03",
      product: "바지 외 5개",
      sender: "홍길동",
      startDate: "2024/09/17",
      receiver: "오가닉재단",
      status: "배송대기",
      link: "https://tracker.delivery/"
    }
  ]

  const statusColor = status => {
    switch (status) {
      case "배송완료":
        return "status-complete"
      case "배송중":
        return "status-progress"
      case "배송대기":
        return "status-wait"
      default:
        return ""
    }
  }

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

        {/* 
        배송 단계 표시 (Progress Indicator)
        현재 단계에 색상이 들어가는 형식입니다.
        클릭 기능 없음, 시각적 안내용 UI
        */}

        <div className="delivery-check-content">
          <h1>배송 조회</h1>

          <div className="delivery-step-box">
            <div className="step">수거요청</div>
            <div className="step">수거완료</div>
            <div className="step">배송중</div>
            <div className="step">도착완료</div>
          </div>

          <table className="delivery-table">
            <thead>
              <tr>
                <th>송장번호</th>
                <th>보내는 곳</th>
                <th>배송 시작</th>
                <th>받는 곳</th>
                <th>상태</th>
                <th>조회</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.id}</td>
                  <td>{row.sender}</td>
                  <td>{row.startDate}</td>
                  <td>{row.receiver}</td>
                  <td>
                    <span className={`status-badge ${statusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                  <button
  className="delivery-link"
  onClick={() => alert("상세조회 기능은 준비중입니다.")}
>
  상세조회 →
</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </section>
  )
}
