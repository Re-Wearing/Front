import { useEffect, useState } from 'react'

export default function MyPage({
  user,
  profile,
  onSaveProfile,
  onChangePassword,
  onWithdraw,
  onNavigateHome,
  onRequireLogin = () => {}
}) {
  const [form, setForm] = useState({
    nickname: '',
    phone: '',
    address: '',
    allowEmail: true,
    email: ''
  })
  const [profileMessage, setProfileMessage] = useState('')
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    next: '',
    confirm: ''
  })
  const [passwordMessage, setPasswordMessage] = useState('')
  const [withdrawInput, setWithdrawInput] = useState('')
  const [withdrawMessage, setWithdrawMessage] = useState('')

  const syncForm = () => {
    if (profile && user) {
      setForm({
        nickname: profile.nickname || user.name,
        phone: profile.phone || '',
        address: profile.address || '',
        allowEmail: Boolean(profile.allowEmail),
        email: user.email || ''
      })
    }
  }

  useEffect(() => {
    syncForm()
  }, [profile, user])

  if (!user || !profile) {
    return (
      <div className="mypage-page">
        <div className="mypage-card basic">
          <p>로그인이 필요합니다.</p>
          <button className="btn primary" type="button" onClick={onRequireLogin}>
            로그인으로 이동
          </button>
        </div>
      </div>
    )
  }

  const nickname = form.nickname || user.name
  const withdrawToken = `${nickname}/탈퇴한다.`

  const handleProfileChange = event => {
    const { name, value, type, checked } = event.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleProfileSubmit = event => {
    event.preventDefault()
    const result = onSaveProfile(form)
    setProfileMessage(result.message || (result.success ? '저장되었습니다.' : '실패했습니다.'))
  }

  const handlePasswordSubmit = event => {
    event.preventDefault()
    if (!passwordForm.current || !passwordForm.next) {
      setPasswordMessage('비밀번호를 모두 입력해주세요.')
      return
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordMessage('새 비밀번호가 일치하지 않습니다.')
      return
    }
    const result = onChangePassword(passwordForm.current, passwordForm.next)
    setPasswordMessage(result.message || (result.success ? '비밀번호가 변경되었습니다.' : '실패했습니다.'))
    if (result.success) {
      setPasswordForm({ current: '', next: '', confirm: '' })
    }
  }

  const handleWithdrawSubmit = () => {
    if (withdrawInput !== withdrawToken) {
      setWithdrawMessage(`"${withdrawToken}" 문구를 정확히 입력해주세요.`)
      return
    }
    const result = onWithdraw()
    setWithdrawMessage(result.message || (result.success ? '회원 탈퇴가 완료되었습니다.' : '실패했습니다.'))
  }

  return (
    <div className="mypage-page">
      <div className="mypage-layout">
        <aside className="mypage-profile-card">
          <div className="mypage-avatar">👤</div>
          <strong className="mypage-name">{nickname}</strong>
          <p className="mypage-email">{form.email}</p>

          <div className="mypage-actions">
            <button type="button" className="outline">
              비밀번호 변경
            </button>
            <button type="button" className="danger" onClick={handleWithdrawSubmit}>
              회원탈퇴
            </button>
          </div>
          <div className="mypage-withdraw-info">
            <p>회원탈퇴를 진행하려면 아래 문구를 입력해주세요.</p>
            <code>{withdrawToken}</code>
            <input
              type="text"
              value={withdrawInput}
              onChange={event => setWithdrawInput(event.target.value)}
              placeholder="확인 문구 입력"
            />
            {withdrawMessage ? <p className="helper danger">{withdrawMessage}</p> : null}
          </div>
        </aside>

        <section className="mypage-content">
          <form className="mypage-form" onSubmit={handleProfileSubmit}>
            <h2>프로필 편집</h2>
            <label>
              닉네임
              <input
                name="nickname"
                value={form.nickname}
                onChange={handleProfileChange}
                placeholder="닉네임 입력"
              />
            </label>
            <label>
              이메일
              <input name="email" value={form.email} onChange={handleProfileChange} placeholder="이메일" />
            </label>
            <label>
              휴대전화번호
              <input name="phone" value={form.phone} onChange={handleProfileChange} placeholder="010-0000-0000" />
            </label>
            <label>
              주소
              <input name="address" value={form.address} onChange={handleProfileChange} placeholder="주소를 입력하세요" />
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                name="allowEmail"
                checked={form.allowEmail}
                onChange={handleProfileChange}
              />
              이메일 알림 수신
            </label>
            {profileMessage ? <p className="helper">{profileMessage}</p> : null}
            <div className="mypage-form-actions">
              <button type="button" className="btn ghost" onClick={syncForm}>
                취소
              </button>
              <button type="submit" className="btn primary">
                저장
              </button>
            </div>
          </form>

          <form className="mypage-form secondary" onSubmit={handlePasswordSubmit}>
            <h3>비밀번호 변경</h3>
            <label>
              현재 비밀번호
              <input
                type="password"
                value={passwordForm.current}
                onChange={event =>
                  setPasswordForm(prev => ({
                    ...prev,
                    current: event.target.value
                  }))
                }
              />
            </label>
            <label>
              새 비밀번호
              <input
                type="password"
                value={passwordForm.next}
                onChange={event =>
                  setPasswordForm(prev => ({
                    ...prev,
                    next: event.target.value
                  }))
                }
              />
            </label>
            <label>
              새 비밀번호 확인
              <input
                type="password"
                value={passwordForm.confirm}
                onChange={event =>
                  setPasswordForm(prev => ({
                    ...prev,
                    confirm: event.target.value
                  }))
                }
              />
            </label>
            {passwordMessage ? <p className="helper">{passwordMessage}</p> : null}
            <div className="mypage-form-actions">
              <button type="submit" className="btn primary">
                변경
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

