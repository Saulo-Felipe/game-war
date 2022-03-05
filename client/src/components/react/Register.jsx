import { Link } from 'react-router-dom'
import '../../styles/login.css'

export default function login() {


  return (
    <div className="login">
      <div className="login-container">
        <header className="login-header">Novo Cadatro</header>
        <section className="login-section">
          <div>

            <input className="form-beautiful" type="text" placeholder="Nome de usuário" />
            <input className="form-beautiful" type="text" placeholder="Email" />
            <input className="form-beautiful" type="password" placeholder="Senha" />
            <input className="form-beautiful" type="password" placeholder="Nome de usuário ou Email" />
          </div>

          <div className="text-start"> 
            <input className="me-1" id="save-date-login" type="checkbox" />
            <label htmlFor="save-date-login">Salvar login</label>
          </div>

          <button className="form-btn-iceBlue btn">Entrar</button>
        </section>
        <footer className="login-footer">
          Não tem uma conta? <Link to="/login"> Cadastre-se</Link>
        </footer>
      </div>
    </div>
  )
}