import { useEffect, useState } from 'react'
import '../../styles/login.css'
import { Link } from 'react-router-dom'
import api from '../../services/api'

export default function Login() {

  const [loginData, setLoginData] = useState({
    user: String(),
    password: String(),
    showPassword: false,
  })
  const [logsStatus, setLogsStatus] = useState({
    msg: ""
  })

  function handleChangeUser(data) {
    let value = data.value

    if (value.length <= 30) {
      data.style.border = "0px"

      setLoginData({
        user: value,
        password: loginData.password,
        showPassword: loginData.showPassword
      })     
    } else {
      data.style.border = "solid 1px red"
    }
  }

  function handleChangePassword(data) {
    let value = data.value

    if (value.length <= 30) {
      data.style.border = "0px"

      setLoginData({
        user: loginData.user,
        password: value,
        showPassword: loginData.showPassword
      })     
    } else {
      data.style.border = "solid 1px red"
    }
  }

  useEffect(() => {
    if (loginData.user.length >= 30 || loginData.password.length >= 30) {
      setLogsStatus({
        error: true,
        msg: "Limite de caractere atingido."
      })
    } 
    else {
      setLogsStatus({
        msg: ""
      })
    }
  }, [loginData])



  async function login() {
    var response = await api.post("/login", { teste: "ok" })

    console.log("Recebido: ", response)
  }

  return (
    <div className="login">
      <div className="login-container">
        <header className="login-header">LOGIN</header>
        {
          logsStatus.error 
          ? <div className="error-container">{logsStatus.msg}</div> : 
          
          logsStatus.success 
          ? <div className="success-container">{logsStatus.msg}</div> 
          : <></> 
        }
        <section className="login-section">
          <div>
            <input 
              className="form-beautiful" 
              type="text" 
              placeholder="Nome de usuário ou Email" 
              onChange={(data) => handleChangeUser(data.target)}
              value={loginData.user}
            />
            <input 
              className="form-beautiful" 
              type="password" 
              placeholder="Nome de usuário ou Email" 
              onChange={(data) => handleChangePassword(data.target)}
            />
          </div>

          <div className="text-start"> 
            <input 
              className="me-1" 
              id="save-date-login" 
              type="checkbox" 
              checked={loginData.showPassword}
              onChange={(data) => setLoginData({
                user: loginData.user,
                password: loginData.password,
                showPassword: data.target.checked
              })}
            />
            <label htmlFor="save-date-login">Mostrar senha</label>
          </div>

          <button className="form-btn-iceBlue btn" onClick={() => { login() }}>Entrar</button>
        </section>
        <footer className="login-footer">
          Não tem uma conta? <Link to="/register"> Cadastre-se</Link>
        </footer>
      </div>
    </div>
  )

}