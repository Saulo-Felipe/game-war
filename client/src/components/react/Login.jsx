import { useState } from 'react'
import '../../styles/small-form.css'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import errorValidation from '../../services/errorValidation'
import { useDispatch } from 'react-redux'
import { changePlayer } from '../../redux/playerSlice'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    showPassword: false,
  })
  const [logsStatus, setLogsStatus] = useState({
    msg: ""
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleChangeForm(element) {
    if (element.email)
      setLoginData({...loginData, email: element.email.value})
    else if (element.password)
      setLoginData({...loginData, password: element.password.value})
    
    setLogsStatus({
      msg: ""
    })
  }

  async function finishLogin() {
    if (loginData.email.length === 0 || loginData.password.length === 0)
      return setLogsStatus({
        error: true,
        msg: "Preencha todos os campos."
      })

    setLoading(true)
    var {data} = await api.post("/login", {
      email: loginData.email,
      password: loginData.password
    })
    setLoading(false)

    if (!errorValidation(data)) return false

    if (!data.success)
      return setLogsStatus({
        error: true,
        msg: data.msg
      })
    
    if (data.success) {
      console.log("token: ", data)
      localStorage.setItem("token_login", data.token)

      setLogsStatus({
        success: true,
        msg: "Login realizado com sucesso!"
      })

      setTimeout(() => {
        navigate("/home")
      }, 2500)
    }
  }

  return (
    <div className="small-form">
      <div className="small-form-container">
        {
          logsStatus.error 
          ? <div className="error-container">{logsStatus.msg}</div> : 
          
          logsStatus.success 
          ? <div className="success-container">{logsStatus.msg}</div> 
          : <></> 
        }
        <section className="small-form-section pb-5">
          <div>
            <div className="input-container">
              <i class="fas fa-envelope"></i>
              <input 
                className="form-beautiful" 
                id="user"
                type="text" 
                placeholder="nome de Usuário ou Email" 
                onChange={(data) => handleChangeForm({ email: data.target})}
                value={loginData.email}
              />
            </div>

            <div className="input-container">
              <i className="fas fa-lock"></i>
              <input 
                className="form-beautiful" 
                type={ loginData.showPassword ? "text" : "password" }
                placeholder="Senha" 
                onChange={(data) => handleChangeForm({ password: data.target })}
                value={loginData.password}
              />
            </div>


          </div>

          <div className="text-start"> 
            <input 
              className="ms-2 mt-2" 
              id="show-password-small-form" 
              type="checkbox" 
              checked={loginData.showPassword}
              onChange={(data) => setLoginData({ ...loginData, showPassword: data.target.checked })}
            />
            <label htmlFor="show-password-small-form">Mostrar senha</label>
          </div>
          {
            loading 
            ? <img className="mt-3 mb-3" width={"15%"} src={require("../../assets/images/ballsLoading.gif")} />
            : <></>
          }
          <br />
          <button 
            className="form-btn-iceBlue btn" 
            onClick={() => { finishLogin() }}
            disabled={ logsStatus.error || loading || logsStatus.success ? true : false }
          >Entrar</button>
        </section>
        <footer className="small-form-footer">
          Não tem uma conta? <Link to="/register"> Cadastre-se</Link>
        </footer>
      </div>
    </div>
  )

}