import { useState } from 'react'
import css from './loginpage.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../store/userSlice'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errUsername, setErrUsername] = useState('')
  const [errPassword, setErrPassword] = useState('')
  const [loginState, setLoginState] = useState('')
  const [redirect, setRedirect] = useState(false)
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
  const login = async e => {
    e.preventDefault()
    setLoginState('')
    validateUsername(username)
    validatePassword(password)
    if (errPassword || errUsername || !username || !password) {
      setLoginState('아이디와 패스워드를 확인하세요.')
      return
    }
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      })
      console.log(response.data)

      if (response.status === 200) {
        setLoginState('로그인 성공')
        dispatch(setUserInfo(response.data))
        setTimeout(() => {
          setRedirect(true)
        }, 1000)
      } else {
        console.log('----')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoginState(false)
    }
  }
  if (redirect) {
    navigate('/')
  }

  return (
    <main className={css.loginpage}>
      <h2>LoginPage</h2>
      {loginState && <strong>{loginState}</strong>}
      <form className={css.container} onSubmit={login}>
        <input value={username} onChange={handleUsernameChange} type="text" placeholder="아이디" />
        <strong>{errUsername}</strong>
        <input
          value={password}
          onChange={handlePasswordChange}
          type="password"
          placeholder="패스워드"
        />
        <strong>{errPassword}</strong>
        <button type="submit">로그인</button>
      </form>
    </main>
  )
}
