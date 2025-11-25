export const mainNavLinks = [
  { label: '사업소개', href: '/business' },
  { label: '게시판', href: '#board' },
  { label: '마이페이지', href: '#mypage' },
  { label: 'FAQ', href: '#faq' }
]

export const experienceStats = [
  { value: '3,200+', label: '다시 입혀진 의류' },
  { value: '187곳', label: '참여 기관' },
  { value: '92%', label: '이용자 만족도' }
]

export const experienceValueCards = [
  {
    title: '몰라요 몰라라',
    body: '우리는 어쩌구 저쩌구 잘했습니다.'
  },
  {
    title: '알룰로스 알룰로스',
    body: '우리는 어쩌구 저쩌구 잘했습니다.'
  },
  {
    title: '어쩌구 저쩌구 리포트트',
    body: '기부로 인해 어쩌구 됐습니다다.'
  }
]

export const experienceSteps = [
  {
    title: '01. 물품 등록',
    body: '사진과 간단한 컨디션만 입력하면 2분 만에 등록이 끝나요.'
  },
  {
    title: '02. 검수 · 포장',
    body: '전문 파트너가 세탁 · 검수를 진행해 품질을 보장합니다.'
  },
  {
    title: '03. 기관 매칭',
    body: '선택하지 않아도 필요로 하는 기관과 자동 매칭되어 적시에 전달됩니다.'
  },
  {
    title: '04. 성과 리포트',
    body: '나눔 영향을 게시판을 통해 나눌 수 있습니다다.'
  }
]

export const membershipOptions = [
  { value: 'general', label: '일반 회원' },
  { value: 'organization', label: '기관 회원' }
]

export const membershipForms = {
  general: [
    { id: 'username', label: '아이디', type: 'text', placeholder: '아이디를 입력하세요' },
    {
      id: 'password',
      label: '비밀번호',
      type: 'password',
      placeholder: '비밀번호를 입력하세요',
      toggleable: true
    },
    { id: 'fullName', label: '이름', type: 'text', placeholder: '홍길동' },
    {
      id: 'email',
      label: '이메일',
      type: 'email',
      placeholder: 'example@example.com',
      actionLabel: '인증코드 전송'
    },
    {
      id: 'emailCode',
      label: '인증코드',
      type: 'text',
      placeholder: '인증코드를 입력하세요',
      actionLabel: '인증 확인'
    },
    { id: 'phone', label: '전화번호', type: 'tel', placeholder: '010-0000-0000' },
    {
      id: 'nickname',
      label: '닉네임(선택사항)',
      type: 'text',
      placeholder: '닉네임을 입력하세요',
      optional: true
    }
  ],
  organization: [
    { id: 'username', label: '아이디', type: 'text', placeholder: '아이디를 입력하세요' },
    {
      id: 'password',
      label: '비밀번호',
      type: 'password',
      placeholder: '비밀번호를 입력하세요',
      toggleable: true
    },
    { id: 'manager', label: '이름', type: 'text', placeholder: '담당자 이름' },
    {
      id: 'email',
      label: '이메일',
      type: 'email',
      placeholder: 'example@example.com',
      actionLabel: '인증코드 전송'
    },
    {
      id: 'emailCode',
      label: '인증코드',
      type: 'text',
      placeholder: '인증코드를 입력하세요',
      actionLabel: '인증 확인'
    },
    { id: 'phone', label: '전화번호', type: 'tel', placeholder: '010-0000-0000' },
    {
      id: 'nicknameInfo',
      label: '닉네임(기관명과 동일하게 설정됩니다.)',
      type: 'text',
      placeholder: '기관명과 동일하게 표시됩니다',
      readOnly: true,
      readOnlyValue: '기관명과 동일하게 표시됩니다'
    },
    {
      id: 'orgName',
      label: '기관명',
      type: 'text',
      placeholder: '기관명을 입력하세요'
    },
    {
      id: 'businessNumber',
      label: '사업자 번호',
      type: 'text',
      placeholder: '000-00-00000'
    }
  ]
}

export const boardTabs = [
  { label: '최신순', value: 'latest', active: true },
  { label: '가장 많이 본', value: 'popular' },
  { label: '오래된순', value: 'oldest' }
]

export const boardNotices = [
  {
    id: 'notice-1',
    title: 'RE:WEAR 서비스 오픈 안내',
    writer: '관리자',
    views: 324,
    date: '2025.10.30'
  },
  {
    id: 'notice-2',
    title: '서비스 이용 가이드',
    writer: '관리자',
    views: 275,
    date: '2025.10.28'
  }
]

export const boardPosts = [
  {
    id: 7,
    title: '포인트 적립 제도 변경 안내',
    writer: '기부자123',
    views: 189,
    date: '2025.10.25'
  },
  {
    id: 6,
    title: '포인트 적립 제도 변경 안내',
    writer: '기부자123',
    views: 189,
    date: '2025.10.25'
  },
  {
    id: 5,
    title: '환경 보호 캠페인 참여 방법',
    writer: '환경지킴이',
    views: 156,
    date: '2025.10.20'
  },
  {
    id: 4,
    title: '좋은 선물 받아서 아이들이 좋아합니다',
    writer: '마더테레사',
    views: 423,
    date: '2025.10.15'
  },
  {
    id: 3,
    title: '기부 후 감사 메시지 받았어요!',
    writer: '나눔천사',
    views: 89,
    date: '2025.10.10'
  },
  {
    id: 2,
    title: '기부 후 감사 메시지 받았어요!',
    writer: '나눔천사',
    views: 89,
    date: '2025.10.10'
  },
  {
    id: 1,
    title: '기부 후 감사 메시지 받았어요!',
    writer: '나눔천사',
    views: 89,
    date: '2025.10.10'
  },
  {
    id: 0,
    title: '기부 후 감사 메시지 받았어요!',
    writer: '나눔천사',
    views: 89,
    date: '2025.10.10'
  }
]

