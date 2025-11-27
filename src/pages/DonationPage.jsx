import { useState } from 'react'
import HeaderLanding from '../components/HeaderLanding'
import { mainNavLinks } from '../constants/landingData'

const ITEM_CATEGORIES = [
  '남성 의류',
  '여성 의류',
  '아동 의류',
  '공용 의류',
  '액세서리리'
]

const ITEM_DETAILS = {
  '남성 의류': ['상의', '하의', '아우터', '한 벌 옷', '기타 의류'],
  '여성 의류': ['상의', '하의', '아우터', '한 벌 옷', '기타 의류'],
  '아동 의류': ['상의', '하의', '아우터', '한 벌 옷', '기타 의류'],
  '공용 의류': ['상의', '하의', '아우터', '한 벌 옷', '기타 의류'],
  '액세서리리': ['시계', '가방', '모자', '장갑', '스카프', '기타 액세서리'],
}

const ITEM_SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'FREE', '기타 사이즈']

const ITEM_CONDITIONS = ['새상품', '사용감 적음', '사용감 보통', '사용감 많음']

const DONATION_METHODS = ['자동 매칭', '직접 매칭']
const DONATION_ORGANIZATIONS = [
  '오가닉 재단',
  '희망 나눔 센터',
  '그린 라이프',
  '아름다운 가게',
  '굿윌스토어',
  '옷캔',
  '기타 기관',
  '기타'
]
const DELIVERY_METHODS = ['직접 배송', '택배 배송']

export default function DonationPage({
  onNavigateHome,
  onNavLink,
  isLoggedIn = false,
  onLogout = () => {},
  onNotifications = () => {},
  unreadCount = 0,
  onMenu = () => {},
  currentUser,
  onRequireLogin,
  onAddDonation,
  onGoToDonationStatus
}) {
  const [itemType, setItemType] = useState('')
  const [itemDetail, setItemDetail] = useState('')
  const [itemSize, setItemSize] = useState('')
  const [itemCondition, setItemCondition] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [images, setImages] = useState([])
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState('item') // 'item' or 'application'
  
  // 기부 신청 폼 상태
  const [donationMethod, setDonationMethod] = useState('')
  const [donationOrganization, setDonationOrganization] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [desiredDate, setDesiredDate] = useState('')
  const [memo, setMemo] = useState('')
  const [applicationErrors, setApplicationErrors] = useState({})

  const handleItemTypeChange = (value) => {
    setItemType(value)
    setItemDetail('')
  }

  const handleImageUpload = (e, type) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      const newImages = files.map(file => ({
        id: Date.now() + Math.random(),
        file,
        type,
        preview: URL.createObjectURL(file)
      }))
      setImages([...images, ...newImages])
    }
  }

  const handleRemoveImage = (id) => {
    const imageToRemove = images.find(img => img.id === id)
    if (imageToRemove?.preview) {
      URL.revokeObjectURL(imageToRemove.preview)
    }
    setImages(images.filter(img => img.id !== id))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!itemType) {
      newErrors.itemType = '물품 종류를 선택해주세요.'
    }

    if (itemType && itemType !== '기타' && !itemDetail) {
      newErrors.itemDetail = '물품 상세를 선택해주세요.'
    }

    if (!itemSize) {
      newErrors.itemSize = '물품 사이즈를 선택해주세요.'
    }

    if (!itemCondition) {
      newErrors.itemCondition = '물품 상태 정보를 선택해주세요.'
    }

    if (!itemDescription.trim()) {
      newErrors.itemDescription = '물품 상세 정보를 입력해주세요.'
    }

    if (quantity < 1) {
      newErrors.quantity = '수량은 1개 이상이어야 합니다.'
    }

    if (images.length === 0) {
      newErrors.images = '사진을 최소 1개 이상 업로드해주세요.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!isLoggedIn || !currentUser) {
      if (onRequireLogin) {
        onRequireLogin()
      }
      return
    }

    if (!validateForm()) {
      return
    }

    // TODO: 실제 물품 등록 로직 구현
    // 기부 신청 단계로 이동
    setStep('application')
  }

  const validateApplicationForm = () => {
    const newErrors = {}

    if (!donationMethod) {
      newErrors.donationMethod = '기부 방법을 선택해주세요.'
    }

    if (donationMethod === '직접 매칭') {
      if (!donationOrganization) {
        newErrors.donationOrganization = '기부할 기관을 선택해주세요.'
      }
      if (!deliveryMethod) {
        newErrors.deliveryMethod = '배송 방법을 선택해주세요.'
      }
      if (!desiredDate) {
        newErrors.desiredDate = '희망일을 선택해주세요.'
      }
    }

    if (!isAnonymous && !name.trim()) {
      newErrors.name = '이름을 입력해주세요.'
    }

    if (!contact.trim()) {
      newErrors.contact = '연락처를 입력해주세요.'
    }

    setApplicationErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleApplicationSubmit = (e) => {
    e.preventDefault()
    
    if (!validateApplicationForm()) {
      return
    }

    // 기부 내역 추가
    if (onAddDonation) {
      onAddDonation({
        itemType,
        itemDetail,
        itemSize,
        itemCondition,
        itemDescription,
        donationMethod,
        donationOrganization,
        deliveryMethod,
        name: isAnonymous ? '익명' : name,
        contact,
        desiredDate,
        memo
      })
    }

    // TODO: 실제 기부 신청 로직 구현
    alert('기부 신청이 완료되었습니다! 감사합니다.')
    
    // 초기화 및 기부 현황 조회로 이동
    setStep('item')
    setItemType('')
    setItemDetail('')
    setItemSize('')
    setItemCondition('')
    setItemDescription('')
    setQuantity(1)
    setImages([])
    setDonationMethod('')
    setDonationOrganization('')
    setDeliveryMethod('')
    setIsAnonymous(false)
    setName('')
    setContact('')
    setDesiredDate('')
    setMemo('')
    
    if (onGoToDonationStatus) {
      onGoToDonationStatus()
    } else {
      onNavigateHome()
    }
  }

  const today = new Date().toISOString().split('T')[0]

  // 기부 신청 단계
  if (step === 'application') {
    return (
      <section className="main-page donation-page">
        <div className="main-shell donation-shell">
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

          <div className="donation-content">
            <div className="donation-header">
              <button
                type="button"
                className="btn-back"
                onClick={() => setStep('item')}
                aria-label="뒤로 가기"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <h1>기부 신청</h1>
            </div>

            <form onSubmit={handleApplicationSubmit} className="donation-form">
              {/* 기부 방법 */}
              <div className="form-group">
                <label htmlFor="donationMethod">
                  기부 방법
                  {applicationErrors.donationMethod && (
                    <span className="error-message">{applicationErrors.donationMethod}</span>
                  )}
                </label>
                <div className="select-wrapper">
                  <select
                    id="donationMethod"
                    value={donationMethod}
                    onChange={(e) => {
                      setDonationMethod(e.target.value)
                      setDonationOrganization('')
                      setDeliveryMethod('')
                    }}
                    className={applicationErrors.donationMethod ? 'error' : ''}
                  >
                    <option value="">선택하세요</option>
                    {DONATION_METHODS.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                  {donationMethod && (
                    <>
                      <span className="check-icon" aria-label="선택됨">✓</span>
                      <button
                        type="button"
                        className="btn-clear"
                        onClick={() => {
                          setDonationMethod('')
                          setDonationOrganization('')
                          setDeliveryMethod('')
                        }}
                        aria-label="선택 취소"
                      >
                        ×
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* 자동 매칭인 경우 */}
              {donationMethod === '자동 매칭' && (
                <>
                  <div className="form-group">
                    <div className="form-group-header">
                      <label htmlFor="name">
                        이름
                        {applicationErrors.name && (
                          <span className="error-message">{applicationErrors.name}</span>
                        )}
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => {
                            setIsAnonymous(e.target.checked)
                            if (e.target.checked) {
                              setName('')
                            }
                          }}
                        />
                        <span>익명</span>
                      </label>
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="이름을 입력하세요"
                      className={applicationErrors.name ? 'error' : ''}
                      disabled={isAnonymous}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact">
                      연락처
                      {applicationErrors.contact && (
                        <span className="error-message">{applicationErrors.contact}</span>
                      )}
                    </label>
                    <input
                      id="contact"
                      type="tel"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="010-0000-0000"
                      className={applicationErrors.contact ? 'error' : ''}
                    />
                  </div>
                </>
              )}

              {/* 직접 매칭인 경우 */}
              {donationMethod === '직접 매칭' && (
                <>
                  {/* 기부 선택 */}
                  <div className="form-group">
                    <label htmlFor="donationOrganization">
                      기부 선택
                      {applicationErrors.donationOrganization && (
                        <span className="error-message">{applicationErrors.donationOrganization}</span>
                      )}
                    </label>
                    <div className="select-wrapper">
                      <select
                        id="donationOrganization"
                        value={donationOrganization}
                        onChange={(e) => setDonationOrganization(e.target.value)}
                        className={applicationErrors.donationOrganization ? 'error' : ''}
                      >
                        <option value="">선택하세요</option>
                        {DONATION_ORGANIZATIONS.map(org => (
                          <option key={org} value={org}>{org}</option>
                        ))}
                      </select>
                      {donationOrganization && (
                        <>
                          <span className="check-icon" aria-label="선택됨">✓</span>
                          <button
                            type="button"
                            className="btn-clear"
                            onClick={() => setDonationOrganization('')}
                            aria-label="선택 취소"
                          >
                            ×
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* 배송 방법 */}
                  {donationOrganization && (
                    <div className="form-group">
                      <label htmlFor="deliveryMethod">
                        배송 방법
                        {applicationErrors.deliveryMethod && (
                          <span className="error-message">{applicationErrors.deliveryMethod}</span>
                        )}
                      </label>
                      <div className="select-wrapper">
                        <select
                          id="deliveryMethod"
                          value={deliveryMethod}
                          onChange={(e) => setDeliveryMethod(e.target.value)}
                          className={applicationErrors.deliveryMethod ? 'error' : ''}
                        >
                          <option value="">선택하세요</option>
                          {DELIVERY_METHODS.map(method => (
                            <option key={method} value={method}>{method}</option>
                          ))}
                        </select>
                        {deliveryMethod && (
                          <>
                            <span className="check-icon" aria-label="선택됨">✓</span>
                            <button
                              type="button"
                              className="btn-clear"
                              onClick={() => setDeliveryMethod('')}
                              aria-label="선택 취소"
                            >
                              ×
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 이름, 연락처 */}
                  <div className="form-group">
                    <div className="form-group-header">
                      <label htmlFor="name">
                        이름
                        {applicationErrors.name && (
                          <span className="error-message">{applicationErrors.name}</span>
                        )}
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => {
                            setIsAnonymous(e.target.checked)
                            if (e.target.checked) {
                              setName('')
                            }
                          }}
                        />
                        <span>익명</span>
                      </label>
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="이름을 입력하세요"
                      className={applicationErrors.name ? 'error' : ''}
                      disabled={isAnonymous}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact">
                      연락처
                      {applicationErrors.contact && (
                        <span className="error-message">{applicationErrors.contact}</span>
                      )}
                    </label>
                    <input
                      id="contact"
                      type="tel"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="010-0000-0000"
                      className={applicationErrors.contact ? 'error' : ''}
                    />
                  </div>

                  {/* 희망일 */}
                  {deliveryMethod && (
                    <div className="form-group">
                      <label htmlFor="desiredDate">
                        희망일
                        {applicationErrors.desiredDate && (
                          <span className="error-message">{applicationErrors.desiredDate}</span>
                        )}
                      </label>
                      <input
                        id="desiredDate"
                        type="date"
                        min={today}
                        value={desiredDate}
                        onChange={(e) => setDesiredDate(e.target.value)}
                        className={applicationErrors.desiredDate ? 'error' : ''}
                      />
                    </div>
                  )}

                  {/* 메모 */}
                  {deliveryMethod && (
                    <div className="form-group">
                      <label htmlFor="memo">메모</label>
                      <textarea
                        id="memo"
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        placeholder="추가로 전달하고 싶은 내용이 있으면 입력하세요"
                        rows={4}
                      />
                    </div>
                  )}
                </>
              )}

              {/* 제출 버튼 */}
              {((donationMethod === '자동 매칭') || (donationMethod === '직접 매칭' && deliveryMethod)) && (
                <div className="donation-actions">
                  <button type="submit" className="btn-submit">
                    기부 신청하기
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    )
  }

  // 물품 등록 단계
  return (
    <section className="main-page donation-page">
      <div className="main-shell donation-shell">
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

        <div className="donation-content">
          <div className="donation-header">
            <h1>기부 물품 등록</h1>
          </div>

          <form onSubmit={handleSubmit} className="donation-form">
            {/* 물품 종류 */}
            <div className="form-group">
              <label htmlFor="itemType">
                물품 종류
                {errors.itemType && <span className="error-message">{errors.itemType}</span>}
              </label>
              <div className="select-wrapper">
                <select
                  id="itemType"
                  value={itemType}
                  onChange={(e) => handleItemTypeChange(e.target.value)}
                  className={errors.itemType ? 'error' : ''}
                >
                  <option value="">선택하세요</option>
                  {ITEM_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {itemType && (
                  <>
                    <span className="check-icon" aria-label="선택됨">✓</span>
                    <button
                      type="button"
                      className="btn-clear"
                      onClick={() => handleItemTypeChange('')}
                      aria-label="선택 취소"
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* 물품 상세 */}
            <div className="form-group">
              <label htmlFor="itemDetail">
                물품 상세
                {errors.itemDetail && <span className="error-message">{errors.itemDetail}</span>}
              </label>
              <div className="select-wrapper">
                <select
                  id="itemDetail"
                  value={itemDetail}
                  onChange={(e) => setItemDetail(e.target.value)}
                  className={errors.itemDetail ? 'error' : ''}
                  disabled={!itemType}
                >
                  <option value="">선택하세요</option>
                  {itemType && ITEM_DETAILS[itemType]?.map(detail => (
                    <option key={detail} value={detail}>{detail}</option>
                  ))}
                </select>
                {itemDetail && (
                  <>
                    <span className="check-icon" aria-label="선택됨">✓</span>
                    <button
                      type="button"
                      className="btn-clear"
                      onClick={() => setItemDetail('')}
                      aria-label="선택 취소"
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* 물품 사이즈 */}
            <div className="form-group">
              <label htmlFor="itemSize">
                물품 사이즈
                {errors.itemSize && <span className="error-message">{errors.itemSize}</span>}
              </label>
              <div className="select-wrapper">
                <select
                  id="itemSize"
                  value={itemSize}
                  onChange={(e) => setItemSize(e.target.value)}
                  className={errors.itemSize ? 'error' : ''}
                >
                  <option value="">선택하세요</option>
                  {ITEM_SIZES.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {itemSize && (
                  <>
                    <span className="check-icon" aria-label="선택됨">✓</span>
                    <button
                      type="button"
                      className="btn-clear"
                      onClick={() => setItemSize('')}
                      aria-label="선택 취소"
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* 물품 상태 정보 */}
            <div className="form-group">
              <label htmlFor="itemCondition">
                물품 상태 정보
                {errors.itemCondition && <span className="error-message">{errors.itemCondition}</span>}
              </label>
              <div className="select-wrapper">
                <select
                  id="itemCondition"
                  value={itemCondition}
                  onChange={(e) => setItemCondition(e.target.value)}
                  className={errors.itemCondition ? 'error' : ''}
                >
                  <option value="">선택하세요</option>
                  {ITEM_CONDITIONS.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
                {itemCondition && (
                  <>
                    <span className="check-icon" aria-label="선택됨">✓</span>
                    <button
                      type="button"
                      className="btn-clear"
                      onClick={() => setItemCondition('')}
                      aria-label="선택 취소"
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* 물품 상세 정보 */}
            <div className="form-group">
              <div className="form-group-header">
                <label htmlFor="itemDescription">
                  물품 상세 정보
                </label>
                <span className="required-text">* 필수 입력 항목입니다.</span>
              </div>
              <textarea
                id="itemDescription"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder="물품에 대한 상세 정보를 입력해주세요"
                className={errors.itemDescription ? 'error' : ''}
                rows={6}
              />
              {errors.itemDescription && (
                <span className="error-message">{errors.itemDescription}</span>
              )}
            </div>

            {/* 수량 */}
            <div className="form-group">
              <label htmlFor="quantity">
                수량
                {errors.quantity && <span className="error-message">{errors.quantity}</span>}
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className={errors.quantity ? 'error' : ''}
              />
            </div>

            {/* 사진 업로드 */}
            <div className="form-group">
              <div className="form-group-header">
                <label>사진 업로드</label>
                <span className="required-text">* 필수 입력 항목입니다.</span>
              </div>
              {errors.images && (
                <span className="error-message">{errors.images}</span>
              )}
              <div className="upload-buttons">
                <label className="upload-button">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, 'photo')}
                    style={{ display: 'none' }}
                  />
                  사진
                </label>
                <label className="upload-button">
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, 'video')}
                    style={{ display: 'none' }}
                  />
                  동영상
                </label>
                <label className="upload-button">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, 'image')}
                    style={{ display: 'none' }}
                  />
                  이미지
                </label>
              </div>
              {images.length > 0 && (
                <div className="upload-preview">
                  {images.map(img => (
                    <div key={img.id} className="preview-item">
                      <img src={img.preview} alt="미리보기" />
                      <button
                        type="button"
                        className="btn-remove-preview"
                        onClick={() => handleRemoveImage(img.id)}
                        aria-label="삭제"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 제출 버튼 */}
            <div className="donation-actions">
              <button type="submit" className="btn-submit">
                물품 등록하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
