import { useState } from 'react'
import css from './registerpage.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errUsername, setErrUsername] = useState('')
  const [errPassword, setErrPassword] = useState('')
  const [errPasswordConfirm, setErrPasswordConfirm] = useState('')
  const [registerState, setRegisterState] = useState('')
  const navigate = useNavigate()

  const validateUsername = value => {
    if (!value) {
      setErrUsername('')
      return
    }
    if (!/^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(value)) {
      setErrUsername('사용자명은 영문자로 시작하는 4자리 이상의 영문자 또는 숫자여야 합니다. ')
    } else {
      setErrUsername('')
    }
  }

  const validatePassword = value => {
    if (!value) {
      setErrPassword('')
      return
    }
    if (value.length < 4) {
      setErrPassword('패스워드는 4자리 이상이어야 합니다.')
    } else {
      setErrPassword('')
    }
  }

  const validatePasswordConfirm = (value, current = password) => {
    if (!value) {
      setErrPasswordConfirm('')
      return
    }
    if (value !== current) {
      setErrPasswordConfirm('패스워드가 일치하지 않습니다.')
    } else {
      setErrPasswordConfirm('')
    }
  }

  const handleUsernameChange = e => {
    const value = e.target.value
    setUsername(value)
    validateUsername(value)
  }

  const handlePasswordChange = e => {
    const value = e.target.value
    setPassword(value)
    validatePassword(value)
  }

  const handlePasswordConfirm = e => {
    const value = e.target.value
    setPasswordConfirm(value)
    validatePasswordConfirm(value)
  }

  const register = async e => {
    e.preventDefault()
    console.log('회원가입', username, password, passwordConfirm)
    validateUsername(username)
    validatePassword(password)
    validatePasswordConfirm(passwordConfirm, password)
    if (
      errUsername ||
      errPassword ||
      errPasswordConfirm ||
      !username ||
      !password ||
      !passwordConfirm
    ) {
      return
    }
    try {
      setRegisterState('등록중')
      const response = await axios.post('http://localhost:3000/register', {
        username,
        password,
      })
      console.log('회원가입 성공', response.data)
      console.log('회원가입 성공', response.status)
      setRegisterState('등록완료')
      navigate('/login')
    } catch (err) {
      console.log('회원가입 실패', err)
      if (err.response) {
        console.log('회원가입 실패', err.response.data)
        console.log('회원가입 실패', err.response.status)
        setRegisterState('등록실패')
      }
    }
  }
  return (
    <main className={css.registerpage}>
      <h2>회원가입 페이지</h2>
      <form className={css.container} onSubmit={register}>
        <input
          type="text"
          placeholder="사용자명"
          value={username}
          onChange={handleUsernameChange}
        />
        <strong>{errUsername}</strong>
        <input
          type="password"
          placeholder="패스워드"
          value={password}
          onChange={handlePasswordChange}
        />
        <strong>{errPassword}</strong>
        <input
          type="password"
          placeholder="패스워드 확인"
          value={passwordConfirm}
          onChange={handlePasswordConfirm}
        />
        <strong>{errPasswordConfirm}</strong>
        <button type="submit">가입하기</button>
      </form>
    </main>
  )
}
