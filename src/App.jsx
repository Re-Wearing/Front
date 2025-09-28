import './App.css'

export default function App() {
  return (
    <>
      <header className="site-header">
        <h1>Re-Wear</h1>
      </header>

      <section id="hero" className="hero">
        <h2>의류 기부 플랫폼</h2>
        <p>Re-Wear는 기부자가 쉽게 물품을 등록하고, 기관과 효율적으로 매칭·수거할 수 있도록 돕는 서비스입니다.</p>
      </section>

      <main className="content">
        <section id="info">
          <h2>프로젝트 소개</h2>
          <p>
            소개글
          </p>
        </section>

        <section id="feature">
          <h2>주요 특징</h2>
          <ul>
            <li>특징1</li>
            <li>특징2</li>
          </ul>
        </section>

        <section id="contact">
          <h2>문의</h2>
          <p>전화번호, 이메일 어쩌고</p>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Re-Wear. All rights reserved.</p>
      </footer>
    </>
  )
}
