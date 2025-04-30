import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import '../common/index.css'
import css from './defaultlayout.module.css'

export const DefaultLayout = () => {
  return (
    <main className={css.defaultlayout}>
      <Header />
      <Outlet />
      <footer>카피라이트 영역</footer>
    </main>
  )
}
