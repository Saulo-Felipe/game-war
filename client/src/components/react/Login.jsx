import { useState } from 'react'
import '../../styles/login.css'
import { Link } from 'react-router-dom'

export default function Login() {

  const [data, setData] = useState({
    user: null,
    password: null,
  })


  return (
    <div className="login">
      <div className="login-container">
        <header className="login-header">LOGIN</header>
        <section className="login-section">
          <input className="form-beautiful" type="text" placeholder="Nome de usuário ou Email" />
          <input className="form-beautiful" type="password" placeholder="Nome de usuário ou Email" />

          <label></label>
          <input type="checkbox"/>

          <button className="form-btn-iceBlue btn">Entrar</button>
        </section>
        <footer className="login-footer">
          Não tem uma conta? <Link to="/register"> Cadastre-se</Link>
        </footer>
      </div>
    </div>
  )

}