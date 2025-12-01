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

export const boardTypes = [
  { label: '기부 후기', value: 'review', active: true },
  { label: '요청 게시판', value: 'request' }
]

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
    date: '2025.10.30',
    content: `안녕하세요, RE:WEAR 관리자입니다.

🎉 RE:WEAR 서비스가 정식 오픈되었습니다. RE:WEAR는 사용하지 않는 의류를 기부하고, 필요한 곳에 전달하는 기부 플랫폼입니다.

주요 기능:
- 의류 기부 신청 및 관리
- 기부 물품 추적 및 배송 확인
- 기관과의 매칭 서비스
- 커뮤니티를 통한 나눔 후기 공유

서비스 이용을 위해 회원가입을 진행해주시기 바랍니다.
일반 회원과 기관 회원을 구분하여 서비스를 제공하고 있습니다.

문의사항이 있으시면 고객센터로 연락 주시기 바랍니다.
감사합니다.`
  },
  {
    id: 'notice-2',
    title: '서비스 이용 가이드',
    writer: '관리자',
    views: 275,
    date: '2025.10.28',
    content: `📚 RE:WEAR 서비스 이용 가이드입니다.

【일반 회원 이용 방법】

1. 기부하기
   - 마이페이지에서 기부 신청을 진행하세요
   - 기부할 의류의 사진과 상태를 입력하세요
   - 배송 정보를 입력하면 기부가 완료됩니다

2. 기부 현황 확인
   - 기부 현황 조회 메뉴에서 자신의 기부 내역을 확인할 수 있습니다
   - 직접 매칭을 선택하면, 원하는 기관에 바로 기부를 진행할 수 있습니다
   - 자동 매칭을 선택하면, 기부 현황 조회 페이지에서 배송 상태와 수령 기관을 확인할 수 있습니다

3. 커뮤니티 활용
   - 기부 후기 게시판에 나눔 경험을 공유할 수 있습니다
   - 다른 회원들의 후기를 확인할 수 있습니다

【기관 회원 이용 방법】

1. 기부 요청하기
   - 요청 게시판에 필요한 의류를 게시하세요
   - 필요한 의류의 종류와 수량을 명시하세요

2. 기부 접수
   - 기부 현황 조회에서 기관에 접수된 기부 물품을 확인하세요
   - 배송 완료 후 수령 확인을 진행하세요

자세한 문의는 고객센터로 연락 주시기 바랍니다.`
  }
]

export const reviewPosts = [
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
    title: '기부한 옷이 유용하게 쓰이고 있어요',
    writer: '기부자123',
    views: 156,
    date: '2025.10.08'
  },
  {
    id: 1,
    title: '뜻깊은 나눔 후기 공유합니다',
    writer: '환경지킴이',
    views: 234,
    date: '2025.10.05'
  }
]

export const requestPosts = [
  {
    id: 11,
    title: '겨울 옷 기부 요청드립니다',
    writer: '희망센터',
    views: 189,
    date: '2025.10.25'
  },
  {
    id: 10,
    title: '아동복 긴급 기부 요청',
    writer: '사랑나눔',
    views: 245,
    date: '2025.10.22'
  },
  {
    id: 9,
    title: '청소년 의류 기부 요청',
    writer: '미래재단',
    views: 156,
    date: '2025.10.20'
  },
  {
    id: 8,
    title: '여성 의류 기부가 필요합니다',
    writer: '여성센터',
    views: 312,
    date: '2025.10.18'
  },
  {
    id: 7,
    title: '남성 정장 기부 요청',
    writer: '취업지원센터',
    views: 198,
    date: '2025.10.15'
  }
]

