import { Link, NavLink } from 'react-router-dom'
import css from './header.module.css'

export const Header = () => {
  return (
    <header className={css.header}>
      <h1>
        <Link to={'/'}>TOKTOKLOG</Link>
      </h1>
      <nav>
        <NavLink to="/register" className={({ isActive }) => (isActive ? css.active : '')}>
          회원가입
        </NavLink>
      </nav>
    </header>
  )
}
