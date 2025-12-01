import { useEffect, useRef, useState } from 'react'
import IntroLanding from './pages/IntroLanding'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import BoardPage from './pages/BoardPage'
import ExperienceLanding from './pages/ExperienceLanding'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ForgotIdPage from './pages/ForgotIdPage'
import VerificationPage from './pages/VerificationPage'
import NotificationPage from './pages/NotificationPage'
import MyPage from './pages/MyPage'
import AdminManagePage from './pages/AdminManagePage'
import AdminFaqPage from './pages/AdminFaqPage'
import FaqPage from './pages/FaqPage'
import InquiryPage from './pages/InquiryPage'
import InquiryAnswerPage from './pages/InquiryAnswerPage'
import DonationStatusPage from './pages/DonationStatusPage'
import OrganizationDonationStatusPage from './pages/OrganizationDonationStatusPage'
import CategoryMenu from './components/CategoryMenu'
import DeliveryCheckPage from './pages/DeliveryCheckPage'
import "./styles/delivery-check.css";
import BusinessIntroPage from './pages/BusinessIntroPage';
import './styles/business-intro.css'
import DonationPage from './pages/DonationPage'
import './styles/donation.css'



import './styles/common.css'
import './styles/intro.css'
import './styles/signup.css'
import './styles/main.css'
import './styles/board.css'
import './styles/notification.css'
import './styles/mypage.css'
import './styles/faq.css'
import './styles/category-menu.css'
import './styles/donation-status.css'
import { ADMIN_FAQ_SEED } from './constants/adminFaqData'

const INITIAL_ACCOUNTS = {
  admin: {
    password: 'admin',
    role: '관리자 회원',
    name: '리웨어 관리자',
    email: 'admin@rewear.com'
  },
  user: {
    password: 'user',
    role: '일반 회원',
    name: '권석현',
    email: 'user@rewear.com'
  },
  organ: {
    password: 'organ',
    role: '기관 회원',
    name: '임당초등학교',
    email: 'organ@rewear.com'
  },
  organ1: {
    password: 'organ1',
    role: '기관 회원',
    name: '임당중학교',
    email: 'organ1@rewear.com'
  }
}

const INITIAL_PROFILES = {
  admin: {
    fullName: '리웨어 관리자',
    nickname: 'RE:WEAR 관리자',
    phone: '010-0000-0000',
    address: '서울시 중구 한강대로 416',
    allowEmail: true,
    useAnonymousName: false
  },
  user: {
    fullName: '권석현',
    nickname: '일반회원',
    phone: '010-1234-5678',
    address: '서울시 강남구 테헤란로 231',
    allowEmail: true,
    useAnonymousName: false
  },
  organ: {
    fullName: '임당초등학교',
    nickname: '임당초등학교',
    phone: '02-9876-5432',
    address: '부산시 해운대구 바닷가로 12',
    allowEmail: false,
    useAnonymousName: false
  },
  organ1: {
    fullName: '임당중학교',
    nickname: '임당중학교',
    phone: '031-555-7890',
    address: '경기도 성남시 판교로 123',
    allowEmail: true,
    useAnonymousName: false
  }
}

const INITIAL_SHIPMENTS = [
  {
    id: '20240917-01',
    product: '양털후리스 외 2개',
    startDate: '2024/09/17',
    receiver: '임당초등학교',
    status: '배송완료',
    sender: '권석현',
    link: 'https://tracker.delivery/'
  },
  {
    id: '20240917-02',
    product: '원피스 외 3개',
    startDate: '2024/09/17',
    receiver: '임당초등학교',
    status: '배송중',
    sender: '권석현',
    link: 'https://tracker.delivery/'
  },
  {
    id: '20240917-03',
    product: '바지 외 5개',
    startDate: '2024/09/17',
    receiver: '임당초등학교',
    status: '배송대기',
    sender: '권석현',
    link: 'https://tracker.delivery/'
  },
  {
    id: '20240917-04',
    product: '운동화 세트',
    startDate: '2024/09/18',
    receiver: '임당중학교',
    status: '배송완료',
    sender: '권석현',
    link: 'https://tracker.delivery/'
  }
]

const INITIAL_NOTIFICATIONS = {
  admin: [
    {
      id: 'admin-1',
      title: '시스템 점검 안내',
      type: 'info',
      date: '2025-02-10',
      read: true
    }
  ],
  user: [
    {
      id: 'user-1',
      title: '새 수거 요청이 도착했어요',
      type: 'alert',
      date: '2025-03-01',
      read: false
    },
    {
      id: 'user-2',
      title: '리워드 포인트가 적립됐어요',
      type: 'reward',
      date: '2025-02-26',
      read: false
    },
    {
      id: 'user-3',
      title: '새로운 드라이버가 배정됐어요',
      type: 'truck',
      date: '2025-02-20',
      read: false
    },
    {
      id: 'user-4',
      title: '지난주 활동 리포트',
      type: 'info',
      date: '2025-02-10',
      read: true
    }
  ],
  organ: [
    {
      id: 'organ-1',
      title: '기부 신청이 접수됐어요',
      type: 'info',
      date: '2025-01-15',
      read: true
    }
  ],
  organ1: [
    {
      id: 'organ1-1',
      title: '새로운 기부가 도착했어요',
      type: 'info',
      date: '2025-03-05',
      read: false
    }
  ]
}

const LANDING_KEY = 'rewearLandingSeen'
const ADMIN_INQUIRIES_KEY = 'rewearAdminInquiries'

const hasSeenLanding = () => {
  if (typeof window === 'undefined') return false
  return window.sessionStorage.getItem(LANDING_KEY) === 'true'
}

const loadAdminInquiries = () => {
  if (typeof window === 'undefined') return []
  try {
    const stored = window.sessionStorage.getItem(ADMIN_INQUIRIES_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to load admin inquiries:', e)
  }
  return []
}

export default function App() {
  const [showLanding, setShowLanding] = useState(() => {
    if (typeof window === 'undefined') return true
    return !hasSeenLanding()
  })
  const [activePage, setActivePage] = useState('main')
  const [currentUser, setCurrentUser] = useState(null)
  const isLoggedIn = Boolean(currentUser)
  const [currentPath, setCurrentPath] = useState('/main')
  const [recoveryContext, setRecoveryContext] = useState(null)
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS)
  const [profiles, setProfiles] = useState(INITIAL_PROFILES)
  const [shipments] = useState(() => {
    if (typeof window === 'undefined') return INITIAL_SHIPMENTS
    const stored = window.sessionStorage.getItem('rewearShipments')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (error) {
        console.error('Failed to parse stored shipments', error)
      }
    }
    window.sessionStorage.setItem('rewearShipments', JSON.stringify(INITIAL_SHIPMENTS))
    return INITIAL_SHIPMENTS
  })
  const currentUserRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [adminInquiries, setAdminInquiries] = useState(ADMIN_FAQ_SEED)
  const [isBootstrapped, setIsBootstrapped] = useState(() => typeof window === 'undefined')
  const updatePath = (path, { replace = false } = {}) => {
    setCurrentPath(path)
    if (typeof window === 'undefined' || !window.history) return
    const state = { path }
    if (replace) {
      window.history.replaceState(state, '', path)
    } else {
      window.history.pushState(state, '', path)
    }
  }

  useEffect(() => {
    if (!showLanding) {
      window.sessionStorage.setItem(LANDING_KEY, 'true')
    }
  }, [showLanding])

  useEffect(() => {
    currentUserRef.current = currentUser
  }, [currentUser])

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsBootstrapped(true)
      return undefined
    }
    const storedUser = window.sessionStorage.getItem('rewearUser')
    let matched = null
    if (storedUser && INITIAL_ACCOUNTS[storedUser]) {
      matched = { username: storedUser, ...INITIAL_ACCOUNTS[storedUser] }
      setCurrentUser(matched)
      setShowLanding(false)
      currentUserRef.current = matched
    }
    const initialPath = window.location.pathname === '/' ? '/main' : window.location.pathname
    navigateByPath(initialPath, { userOverride: matched, replace: true })

    const handlePopState = event => {
      const path = event.state?.path || window.location.pathname
      navigateByPath(path, { userOverride: currentUserRef.current })
    }
    window.addEventListener('popstate', handlePopState)
    setIsBootstrapped(true)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    setAccounts(prev => ({
      ...prev,
      user: { ...prev.user, password: 'user' }
    }))
  }, [])

  const goToMain = (path = '/main', options = {}) => {
    const { push = true, replace = false } = options
    setShowLanding(false)
    setActivePage('main')
    if (push) updatePath(path, { replace })
    else if (replace) updatePath(path, { replace: true })
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.sessionStorage.setItem(ADMIN_INQUIRIES_KEY, JSON.stringify(adminInquiries))
  }, [adminInquiries])

  const goToSignup = (options = {}) => {
    const { push = true, replace = false } = options
    setShowLanding(false)
    setActivePage('signup')
    if (push) updatePath('/signup', { replace })
    else if (replace) updatePath('/signup', { replace: true })
  }

  const goToLogin = (options = {}) => {
    const { push = true, replace = false } = options
    setShowLanding(false)
    setActivePage('login')
    if (push) updatePath('/signin', { replace })
    else if (replace) updatePath('/signin', { replace: true })
  }

  const goToBoard = (options = {}) => {
    const { push = true, replace = false } = options
    setShowLanding(false)
    setActivePage('board')
    if (push) updatePath('/board', { replace })
    else if (replace) updatePath('/board', { replace: true })
  }

  const goToFaq = (options = {}) => {
    const { push = true, replace = false } = options
    if (!currentUser) {
      goToLogin(options)
      return
    }
    if (currentUser.role === '관리자 회원') {
      goToAdminFaq(options, currentUser)
      return
    }
    setShowLanding(false)
    setActivePage('faq')
    if (push) updatePath('/faq', { replace })
    else if (replace) updatePath('/faq', { replace: true })
  }

  const goToInquiry = (options = {}) => {
    const { push = true, replace = false } = options
    setShowLanding(false)
    setActivePage('inquiry')
    if (push) updatePath('/inquiry', { replace })
    else if (replace) updatePath('/inquiry', { replace: true })
  }

  const goToInquiryAnswers = (options = {}) => {
    const { push = true, replace = false } = options
    if (!currentUser) {
      goToLogin(options)
      return
    }
    setShowLanding(false)
    setActivePage('inquiryAnswers')
    if (push) updatePath('/faq/answers', { replace })
    else if (replace) updatePath('/faq/answers', { replace: true })
  }

  const goToDonationStatus = (options = {}, userOverride) => {
    const { push = true, replace = false } = options
    const targetUser = userOverride || currentUser
    if (!targetUser) {
      goToLogin(options)
      return
    }
    if (targetUser.role === '관리자 회원') {
      goToMain('/main', options)
      return
    }
    setShowLanding(false)
    setActivePage(targetUser.role === '기관 회원' ? 'organizationDonationStatus' : 'donationStatus')
    if (push) updatePath('/donation-status', { replace })
    else if (replace) updatePath('/donation-status', { replace: true })
  }
  const goToDeliveryCheck = (options = {}) => {
    const { push = true, replace = false } = options
    setShowLanding(false)
    setActivePage('deliveryCheck')
    if (push) updatePath('/delivery-check', { replace })
    else if (replace) updatePath('/delivery-check', { replace: true })
  }
  const goToBusinessIntro = (options = {}) => {
    const { push = true, replace = false } = options;
    setShowLanding(false);
    setActivePage('businessIntro');
    if (push) updatePath('/business', { replace });
    else if (replace) updatePath('/business', { replace: true });
  };

  const goToDonation = (options = {}) => {
    const { push = true, replace = false } = options;
    setShowLanding(false);
    setActivePage('donation');
    if (push) updatePath('/donation', { replace });
    else if (replace) updatePath('/donation', { replace: true });
  };
  
  

  const goToMyPage = (options = {}, userOverride) => {
    const { push = true, replace = false } = options
    const targetUser = userOverride || currentUser
    if (!targetUser) {
      goToLogin(options)
      return
    }
    setShowLanding(false)
    if (targetUser.role === '관리자 회원') {
      setActivePage('adminManage')
      if (push) updatePath('/admin/manage', { replace })
      else if (replace) updatePath('/admin/manage', { replace: true })
    } else {
      setActivePage('mypage')
      if (push) updatePath('/mypage', { replace })
      else if (replace) updatePath('/mypage', { replace: true })
    }
  }

  const goToNotifications = (options = {}, userOverride) => {
    const { push = true, replace = false } = options
    const targetUser = userOverride || currentUser
    if (!targetUser) {
      goToLogin(options)
      return
    }
    setShowLanding(false)
    setActivePage('notification')
    if (push) updatePath('/notification', { replace })
    else if (replace) updatePath('/notification', { replace: true })
  }

  const goToAdminFaq = (options = {}, userOverride) => {
    const { push = true, replace = false } = options
    const targetUser = userOverride || currentUser
    if (!targetUser || targetUser.role !== '관리자 회원') {
      goToMain(options)
      return
    }
    setShowLanding(false)
    setActivePage('adminFaq')
    if (push) updatePath('/admin/faq', { replace })
    else if (replace) updatePath('/admin/faq', { replace: true })
  }

  const goToForgotPassword = (options = {}) => {
    const { push = true, replace = false } = options
    setShowLanding(false)
    setActivePage('forgotPassword')
    if (push) updatePath('/forgot-password', { replace })
    else if (replace) updatePath('/forgot-password', { replace: true })
  }

  const goToForgotId = (options = {}) => {
    const { push = true, replace = false } = options
    setShowLanding(false)
    setActivePage('forgotId')
    if (push) updatePath('/forgot-id', { replace })
    else if (replace) updatePath('/forgot-id', { replace: true })
  }

  const goToVerification = (options = {}) => {
    const { push = true, replace = false } = options
    setShowLanding(false)
    setActivePage('verification')
    if (push) updatePath('/verification', { replace })
    else if (replace) updatePath('/verification', { replace: true })
  }

  const formatIsoDate = date => date.toISOString().split('T')[0]

  const handleLoginSubmit = (username, password) => {
    const normalizedId = username.trim().toLowerCase()
    const trimmedPw = password.trim()
    const account = accounts[normalizedId]
    if (account && account.password === trimmedPw) {
      const current = { username: normalizedId, ...account }
      setCurrentUser(current)
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('rewearUser', normalizedId)
      }
      return { success: true, role: account.role }
    }
    return { success: false }
  }

  const handleInquirySubmit = ({ title, message }) => {
  if (!currentUser) {
    return { success: false, message: '로그인이 필요합니다.' }
  }
  const trimmedTitle = title.trim()
  const trimmedMessage = message.trim()
  if (!trimmedTitle || !trimmedMessage) {
    return { success: false, message: '문의 제목과 내용을 모두 입력해주세요.' }
  }
  const date = formatIsoDate(new Date())
  const requester = currentUser.username
  const role = currentUser.role
  const nickname = profiles[requester]?.nickname || accounts[requester]?.name || requester
  const displayEmail = accounts[requester]?.email || '등록된 이메일 정보 없음'
  const entryId = `user-inquiry-${Date.now()}`
  const entry = {
    id: entryId,
    question: trimmedTitle,
    title: trimmedTitle,
    message: trimmedMessage,
    description: trimmedMessage,
    email: displayEmail,
    nickname,
    role,
    submittedAt: date,
    requester,
    status: 'pending',
    answer: ''
  }
  setAdminInquiries(prev => [entry, ...prev])
  setNotifications(prev => {
    const adminList = prev.admin || []
    const notification = {
      id: `admin-inquiry-${entryId}`,
      title: `새 문의: ${trimmedTitle}`,
      type: 'alert',
      date,
      read: false,
      target: 'adminFaq'
    }
    return { ...prev, admin: [notification, ...adminList] }
  })
  return { success: true }
  }

  const handleAnswerSubmit = (inquiryId, answerText) => {
  const trimmed = answerText?.trim()
  if (!trimmed) return
  const target = adminInquiries.find(entry => entry.id === inquiryId)
  if (!target) return
  const wasAnswered = target.status === 'answered'
  const answeredAt = formatIsoDate(new Date())
  setAdminInquiries(prev =>
    prev.map(entry =>
      entry.id === inquiryId
        ? {
            ...entry,
            answer: trimmed,
            status: 'answered',
            answeredAt,
            answeredBy: currentUser?.username || 'admin'
          }
        : entry
    )
  )
  if (!wasAnswered && target.requester && accounts[target.requester]) {
    const notification = {
      id: `inquiry-answer-${Date.now()}`,
      title: `문의 답변: ${target.question}`,
      type: 'info',
      date: answeredAt,
      read: false,
      target: 'inquiryAnswers'
    }
    setNotifications(prev => ({
      ...prev,
      [target.requester]: [notification, ...(prev[target.requester] || [])]
    }))
  }
  }

  const handleLogout = () => {
  setCurrentUser(null)
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem('rewearUser')
  }
  goToMain()
  }

  const handleForgotPasswordSubmit = ({ username, email }) => {
  const account = accounts[username.trim()]
  if (!account || account.email !== email.trim()) {
    return { success: false, message: '일치하는 계정을 찾을 수 없습니다.' }
  }
  setRecoveryContext({
    type: 'password',
    account: { username: username.trim(), ...account },
    code: '333333'
  })
  goToVerification()
  return { success: true }
  }

  const handleForgotIdSubmit = ({ name, email }) => {
  const entry = Object.entries(accounts).find(
    ([, data]) => data.name === name.trim() && data.email === email.trim()
  )
  if (!entry) {
    return { success: false, message: '일치하는 정보를 찾을 수 없습니다.' }
  }
  const [username, data] = entry
  setRecoveryContext({
    type: 'id',
    account: { username, ...data },
    code: '333333'
  })
  goToVerification()
  return { success: true }
  }

  const clearRecoveryContext = () => {
    setRecoveryContext(null)
  }

  const handleProfileSave = updates => {
    if (!currentUser) {
      return { success: false, message: '로그인이 필요합니다.' }
    }
    const username = currentUser.username
    setProfiles(prev => ({
      ...prev,
      [username]: {
        ...prev[username],
        fullName: updates.fullName?.trim() || prev[username]?.fullName || accounts[username]?.name,
        nickname: updates.nickname,
        phone: updates.phone,
        address: updates.address,
        allowEmail: updates.allowEmail,
        useAnonymousName:
          typeof updates.useAnonymousName === 'boolean'
            ? updates.useAnonymousName
            : prev[username]?.useAnonymousName
      }
    }))
    if (updates.email) {
      setAccounts(prev => ({
        ...prev,
        [username]: { ...prev[username], email: updates.email }
      }))
      setCurrentUser(prev => (prev ? { ...prev, email: updates.email } : prev))
    }
    return { success: true, message: '프로필이 저장되었습니다.' }
  }

  const handlePasswordChange = (currentPassword, newPassword) => {
    if (!currentUser) {
      return { success: false, message: '로그인이 필요합니다.' }
    }
    const username = currentUser.username
    const record = accounts[username]
    if (!record || record.password !== currentPassword) {
      return { success: false, message: '현재 비밀번호가 올바르지 않습니다.' }
    }
    setAccounts(prev => ({
      ...prev,
      [username]: { ...prev[username], password: newPassword }
    }))
    return { success: true, message: '비밀번호가 변경되었습니다.' }
  }

  const handleWithdraw = () => {
    if (!currentUser) {
      return { success: false, message: '로그인이 필요합니다.' }
    }
    if (currentUser.role === '관리자 회원') {
      return { success: false, message: '관리자는 웹에서 탈퇴할 수 없습니다.' }
    }
    const username = currentUser.username
    setAccounts(prev => {
      const next = { ...prev }
      delete next[username]
      return next
    })
    setProfiles(prev => {
      const next = { ...prev }
      delete next[username]
      return next
    })
    setNotifications(prev => {
      const next = { ...prev }
      delete next[username]
      return next
    })
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('rewearUser')
    }
    setCurrentUser(null)
    goToMain()
    return { success: true }
  }

  const handleAdminPasswordReset = (username, newPassword) => {
    if (!accounts[username]) {
      return { success: false, message: '해당 사용자가 없습니다.' }
    }
    setAccounts(prev => ({
      ...prev,
      [username]: { ...prev[username], password: newPassword }
    }))
    return { success: true }
  }

  const handleAdminDeleteUser = username => {
    if (!accounts[username] || username === 'admin') {
      return { success: false, message: '삭제할 수 없습니다.' }
    }
    setAccounts(prev => {
      const next = { ...prev }
      delete next[username]
      return next
    })
    setProfiles(prev => {
      const next = { ...prev }
      delete next[username]
      return next
    })
    setNotifications(prev => {
      const next = { ...prev }
      delete next[username]
      return next
    })
    return { success: true }
  }

  const handleNotificationDelete = id => {
    if (!currentUser) return
    setNotifications(prev => {
      const list = prev[currentUser.username] || []
      return {
        ...prev,
        [currentUser.username]: list.filter(notification => notification.id !== id)
      }
    })
  }

  const handleNotificationRead = id => {
    if (!currentUser) return
    const username = currentUser.username
    setNotifications(prev => {
      const list = prev[username] || []
      let changed = false
      const nextList = list.map(notification => {
        if (notification.id === id) {
          if (!notification.read) {
            changed = true
          }
          return { ...notification, read: true }
        }
        return notification
      })
      if (!changed) return { ...prev, [username]: nextList }
      return {
        ...prev,
        [username]: nextList
      }
    })
  }

  const handleAddDonation = (donationData) => {
    if (!currentUser) return
    const username = currentUser.username
    const donationId = `donation-${Date.now()}`
    const newDonation = {
      id: donationId,
      date: new Date().toISOString().split('T')[0],
      items: `${donationData.itemType} - ${donationData.itemDetail || ''} (${donationData.itemSize}, ${donationData.itemCondition})`,
      organization: donationData.donationMethod === '자동 매칭' 
        ? '자동 매칭' 
        : donationData.donationOrganization || '미선택',
      status: '대기'
    }
    setDonations(prev => ({
      ...prev,
      [username]: [...(prev[username] || []), newDonation]
    }))
  }

  const handleNotificationNavigate = notification => {
    if (!notification?.target) return
    switch (notification.target) {
      case 'adminFaq':
        goToAdminFaq({ push: true }, currentUser)
        break
      case 'inquiryAnswers':
        goToInquiryAnswers({ push: true })
        break
      default:
        break
    }
  }

  const activeNotifications = currentUser
    ? notifications[currentUser.username] || []
    : []
  const unreadCount = activeNotifications.filter(item => !item.read).length
  const currentProfile = currentUser ? profiles[currentUser.username] : null
  const userInquiries = currentUser
    ? adminInquiries.filter(inquiry => inquiry.requester === currentUser.username)
    : []
  const answeredInquiryCount = userInquiries.filter(inquiry => inquiry.status === 'answered').length

  const handleNavRedirection = link => {
    const href = typeof link === 'string' ? link : link.href
    if (href === '/donation-status' || href === '#donation-status') {
      // 기관 회원이면 기관용 페이지로, 일반 회원이면 일반용 페이지로
      if (currentUser?.role === '기관 회원') {
        goToDonationStatus(undefined, currentUser)
      } else {
        goToDonationStatus()
      }
    } else if (href === '/faq' || href === '#faq') {
      goToFaq()
    } else if (href === '/business' || href === '#about') {
      goToBusinessIntro()
    } else if (href === '/inquiry' || href === '#inquiry') {
      if (currentUser?.role === '관리자 회원') {
        goToAdminFaq()
      } else {
        goToInquiry()
      }
    } else if (href === '/delivery-check' || href === '#delivery-check') {
      goToDeliveryCheck()
    } else if (href === '/donation' || href === '#donation') {
      goToDonation()
    } else if (href === '#board') {
      goToBoard()
    } else if (href === '#mypage') {
      goToMyPage()
    } else {
      goToMain('/main')
    }
    return true
  }

  const navigateByPath = (path, { userOverride } = {}) => {
    switch (path) {
      case '/':
      case '/main':
        goToMain('/main', { push: false, replace: true })
        break
      case '/signup':
        goToSignup({ push: false, replace: true })
        break
      case '/signin':
        goToLogin({ push: false, replace: true })
        break
      case '/board':
        goToBoard({ push: false, replace: true })
        break
      case '/faq':
        goToFaq({ push: false, replace: true })
        break
      case '/faq/answers':
        goToInquiryAnswers({ push: false, replace: true })
        break
      case '/inquiry':
        goToInquiry({ push: false, replace: true })
        break
      case '/mypage':
        goToMyPage({ push: false, replace: true }, userOverride)
        break
      case '/admin/manage':
        goToMyPage({ push: false, replace: true }, userOverride ?? currentUser)
        break
      case '/notification':
        goToNotifications({ push: false, replace: true }, userOverride)
        break
      case '/admin/faq':
        goToAdminFaq({ push: false, replace: true }, userOverride)
        break
      case '/forgot-password':
        goToForgotPassword({ push: false, replace: true })
        break
      case '/forgot-id':
        goToForgotId({ push: false, replace: true })
        break
      case '/verification':
        goToVerification({ push: false, replace: true })
        break
      case '/donation-status':
        goToDonationStatus({ push: false, replace: true }, userOverride)
        break
      case '/delivery-check':
        goToDeliveryCheck({ push: false, replace: true })
        break
      case '/business':
        goToBusinessIntro({ push: false, replace: true })
        break
      case '/donation':
        goToDonation({ push: false, replace: true })
        break

      default:
        goToMain('/main', { push: false, replace: true })
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const handlePopState = event => {
      const path = event.state?.path || window.location.pathname
      navigateByPath(path)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [currentUser])

  if (!isBootstrapped) {
    return null
  }

  return (
    <div className="app-root">
      <CategoryMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavClick={handleNavRedirection}
        role={currentUser?.role}
      />
      {showLanding ? (
        <IntroLanding onClose={goToMain} onLogin={goToLogin} onSignup={goToSignup} />
      ) : activePage === 'signup' ? (
        <SignupPage
          onNavigateHome={goToMain}
          onGoLogin={goToLogin}
          onNavLink={handleNavRedirection}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onNotifications={goToNotifications}
          unreadCount={unreadCount}
          onMenu={() => setIsMenuOpen(true)}
        />
      ) : activePage === 'login' ? (
        <LoginPage
          onNavigateHome={goToMain}
          onGoSignup={goToSignup}
          onNavLink={handleNavRedirection}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onNotifications={goToNotifications}
          onLoginSubmit={handleLoginSubmit}
          onForgotPassword={goToForgotPassword}
          onForgotId={goToForgotId}
          unreadCount={unreadCount}
          onMenu={() => setIsMenuOpen(true)}
        />
      ) : activePage === 'board' ? (
        <BoardPage
          onNavigateHome={goToMain}
          onLogin={goToLogin}
          onNavLink={handleNavRedirection}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onNotifications={goToNotifications}
          unreadCount={unreadCount}
          onMenu={() => setIsMenuOpen(true)}
        />
      ) : activePage === 'notification' ? (
        <NotificationPage
          notifications={activeNotifications}
          onDelete={handleNotificationDelete}
          onMarkRead={handleNotificationRead}
          onNavigate={handleNotificationNavigate}
          onClose={() => goToMain()}
        />
      ) : activePage === 'mypage' ? (
        <MyPage
          user={currentUser}
          profile={currentProfile}
          onSaveProfile={handleProfileSave}
          onChangePassword={handlePasswordChange}
          onWithdraw={handleWithdraw}
          onNavigateHome={goToMain}
          onRequireLogin={goToLogin}
        />
      ) : activePage === 'adminManage' ? (
        <AdminManagePage
          accounts={accounts}
          profiles={profiles}
          notifications={notifications}
          onResetPassword={handleAdminPasswordReset}
          onDeleteUser={handleAdminDeleteUser}
          onNavigateHome={goToMain}
        />
      ) : activePage === 'inquiryAnswers' ? (
        <InquiryAnswersPage
          onNavigateHome={goToMain}
          onNavLink={handleNavRedirection}
          onNotifications={goToNotifications}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          unreadCount={unreadCount}
          onBackToFaq={() => goToFaq()}
          inquiries={userInquiries}
          onMenu={() => setIsMenuOpen(true)}
        />
      ) : activePage === 'adminFaq' ? (
        <AdminFaqPage
          onNavigateHome={goToMain}
          onNavLink={handleNavRedirection}
          onNotifications={goToNotifications}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          unreadCount={unreadCount}
          onBackToAdmin={() => goToMyPage({ push: false, replace: true }, currentUser)}
          adminInquiries={adminInquiries}
          onSubmitAnswer={handleAnswerSubmit}
          onMenu={() => setIsMenuOpen(true)}
        />
      ) : activePage === 'forgotPassword' ? (
        <ForgotPasswordPage
          onNavigateHome={goToMain}
          onSubmit={handleForgotPasswordSubmit}
          onBackToLogin={goToLogin}
        />
      ) : activePage === 'forgotId' ? (
        <ForgotIdPage
          onNavigateHome={goToMain}
          onSubmit={handleForgotIdSubmit}
          onBackToLogin={goToLogin}
        />
      ) : activePage === 'verification' ? (
        <VerificationPage
          context={recoveryContext}
          onResend={() => {
            if (recoveryContext) {
              setRecoveryContext({ ...recoveryContext, code: '333333' })
            }
          }}
          onComplete={() => {
            clearRecoveryContext()
            goToMain()
          }}
          onNavigateHome={goToMain}
        />
      ) : activePage === 'faq' ? (
        <FaqPage
          onNavigateHome={goToMain}
          onNavLink={handleNavRedirection}
          onInquiry={goToInquiry}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onNotifications={goToNotifications}
          unreadCount={unreadCount}
          hasInquiries={userInquiries.length > 0}
          answeredCount={answeredInquiryCount}
          onViewAnswers={() => goToInquiryAnswers()}
          onMenu={() => setIsMenuOpen(true)}
        />
      ) : activePage === 'inquiry' ? (
        <InquiryPage
          onNavigateHome={goToMain}
          onNavLink={handleNavRedirection}
          onBack={() => goToFaq()}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onNotifications={goToNotifications}
          unreadCount={unreadCount}
          onSubmitInquiry={handleInquirySubmit}
          onMenu={() => setIsMenuOpen(true)}
        />
      ) : activePage === 'donationStatus' ? (
        <DonationStatusPage
          onNavigateHome={goToMain}
          onNavLink={handleNavRedirection}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onNotifications={goToNotifications}
          unreadCount={unreadCount}
          onMenu={() => setIsMenuOpen(true)}
          currentUser={currentUser}
          onRequireLogin={goToLogin}
          shipments={shipments}
        />
      ) : activePage === 'deliveryCheck' ? (
        <DeliveryCheckPage
          onNavigateHome={goToMain}
          onNavLink={handleNavRedirection}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onNotifications={goToNotifications}
          unreadCount={unreadCount}
          onMenu={() => setIsMenuOpen(true)}
          currentUser={currentUser}
          currentProfile={currentProfile}
          shipments={shipments}
          donorProfile={profiles.user}
          organizationProfile={currentUser ? profiles[currentUser.username] : null}
        />
      ) : activePage === 'organizationDonationStatus' ? (
        <OrganizationDonationStatusPage
          onNavigateHome={goToMain}
          onNavLink={handleNavRedirection}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onNotifications={goToNotifications}
          unreadCount={unreadCount}
          onMenu={() => setIsMenuOpen(true)}
          currentUser={currentUser}
          onRequireLogin={goToLogin}
          isBootstrapped={isBootstrapped}
          shipments={shipments}
        />
      ) : activePage === 'businessIntro' ? (
        <BusinessIntroPage
          onNavigateHome={goToMain}
          onLogin={goToLogin}
          onNavLink={handleNavRedirection}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onNotifications={goToNotifications}
          unreadCount={unreadCount}
          onMenu={() => setIsMenuOpen(true)}
        />
      ) : activePage === 'donation' ? (
        <DonationPage
          onNavigateHome={goToMain}
          onNavLink={handleNavRedirection}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onNotifications={goToNotifications}
          unreadCount={unreadCount}
          onMenu={() => setIsMenuOpen(true)}
          currentUser={currentUser}
          onRequireLogin={goToLogin}
          onAddDonation={handleAddDonation}
          onGoToDonationStatus={goToDonationStatus}
        />
      ) : (
        <ExperienceLanding
          onLogin={goToLogin}
          onSignup={goToSignup}
          onNavLink={handleNavRedirection}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onNotifications={goToNotifications}
          unreadCount={unreadCount}
          onMenu={() => setIsMenuOpen(true)}
        />
      )}
    </div>
  )
}
