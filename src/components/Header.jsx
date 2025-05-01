import { Link, NavLink } from 'react-router-dom'
import css from './header.module.css'
import { useSelector } from 'react-redux'

export const Header = () => {
  const { username } = useSelector(state => state.user.user)
  console.log(username)

  return (
    <header className={css.header}>
      <h1>
        <Link to={'/'}>TOKTOKLOG</Link>
      </h1>
      <nav>
        <MenuLink to="/login" label="로그인" />
        <MenuLink to="/register" label="회원가입" />
      </nav>
    </header>
  )
}

const MenuLink = ({ to, label }) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? css.active : '')}>
    {label}
  </NavLink>
)
