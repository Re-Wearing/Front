import { useEffect, useMemo, useRef, useState } from 'react'
import Logo from '../components/Logo'

const CODE_LENGTH = 6

export default function VerificationPage({
  context,
  onResend = () => {},
  onComplete = () => {},
  onNavigateHome = () => {}
}) {
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''))
  const [status, setStatus] = useState('pending') // pending | success | error
  const [message, setMessage] = useState('')
  const inputsRef = useRef([])

  useEffect(() => {
    if (!context) {
      onNavigateHome()
    } else {
      setDigits(Array(CODE_LENGTH).fill(''))
      setStatus('pending')
      setMessage('')
      requestAnimationFrame(() => inputsRef.current[0]?.focus())
    }
  }, [context, onNavigateHome])

  const handleChange = (index, value) => {
    const sanitized = value.replace(/[^0-9]/g, '').slice(0, 1)
    setDigits(prev => {
      const next = [...prev]
      next[index] = sanitized
      return next
    })
    if (sanitized && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!context) return
    const value = digits.join('')
    if (value.length !== CODE_LENGTH) {
      setMessage('인증 코드를 모두 입력해주세요.')
      setStatus('error')
      return
    }
    if (value === context.code) {
      setStatus('success')
      setMessage('인증 성공')
    } else {
      setStatus('error')
      setMessage('잘못된 인증번호입니다.')
    }
  }

  const borderClass = useMemo(() => {
    if (status === 'success') return 'success'
    if (status === 'error') return 'error'
    return ''
  }, [status])

  return (
    <div className="recovery-page">
      <div className="recovery-card verification">
        <button type="button" className="recovery-logo" onClick={() => onNavigateHome()}>
          <Logo size="md" />
        </button>
        <h1>Verification</h1>
        <p className="recovery-desc">
          Enter your 6 digits code that you received on your email.
        </p>

        <form className="verification-form" onSubmit={handleSubmit}>
          <div className={`verification-grid ${borderClass}`}>
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={el => (inputsRef.current[index] = el)}
                className="verification-input"
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={event => handleChange(index, event.target.value)}
                onKeyDown={event => handleKeyDown(index, event)}
                maxLength={1}
              />
            ))}
          </div>
          <p className={`verification-timer ${status === 'error' ? 'error' : ''}`}>00:00</p>
          <p className="verification-message">{message}</p>
          <button type="submit" className="submit-button">
            CONTINUE
          </button>
          <p className="verification-resend">
            If you didn’t receive a code!{' '}
            <button
              type="button"
              className="link-button"
              onClick={() => {
                onResend()
                setDigits(Array(CODE_LENGTH).fill(''))
                setStatus('pending')
                setMessage('인증 코드가 재전송되었습니다.')
                inputsRef.current[0]?.focus()
              }}
            >
              Resend
            </button>
          </p>
        </form>

        {status === 'success' && context?.account ? (
          <SuccessModal account={context.account} onComplete={onComplete} />
        ) : null}
      </div>
    </div>
  )
}

function SuccessModal({ account, onComplete }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-icon">✓</div>
        <h2>Successfully</h2>
        <p>ID : {account.username}</p>
        <p>PW : {account.password}</p>
        <button type="button" className="submit-button" onClick={onComplete}>
          메인으로
        </button>
      </div>
    </div>
  )
}

