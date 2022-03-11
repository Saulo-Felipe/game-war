import { useEffect, useState } from 'react'
import '../../styles/small-form.css'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import errorValidation from '../../services/errorValidation'

export default function Register() {

  const [registerData, setRegisterData] = useState({
    user: "",
    email: "",
    password: "",
    passwordAgain: "",
    showPassword: false,
  })
  const [logsStatus, setLogsStatus] = useState({
    error: true,
    msg: ""
  })
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleChangeForm(element) {

    if (element.user)
      setRegisterData({...registerData, user: element.user.value})
    else if (element.email)
      setRegisterData({...registerData, email: element.email.value})
    else if (element.password)
      setRegisterData({...registerData, password: element.password.value})
    else if (element.passwordAgain)
      setRegisterData({...registerData, passwordAgain: element.passwordAgain.value})
  }

  async function register() {
    if (logsStatus.success) {
      setLoading(true)
      const { data } = await api.post("/register", {
        user: registerData.user,
        email: registerData.email,
        password: registerData.password,
      })
      setLoading(false)

      if (!errorValidation(data)) return false

      if (data.isRegistered) {
        return setLogsStatus({
          error: true,
          msg: data.msg
        })
      }

      setLogsStatus({
        success: true,
        msg: "Você foi cadastrado com sucesso!"
      })

      setTimeout(() => {
        return navigate("/login")
      }, 2000 )

    }
  }

  useEffect(() => {
    if (registerData.user.length < 4 && registerData.user.length > 0) {
      setLogsStatus({
        error: true,
        msg: "Nome de usuário muito curto"
      })

    }
    else if (registerData.email.indexOf("@") === -1 && registerData.email.length > 0) {
      setLogsStatus({
        error: true,
        msg: "Email inválido"
      })
    }
    else if (registerData.password.length < 6 && registerData.password.length > 0)
      setLogsStatus({
        error: true,
        msg: "Senha muito pequena, requer pelo menos 6 digitos."
      })
    else if (registerData.passwordAgain !== registerData.password && registerData.password.length > 0 && registerData.passwordAgain.length > 0)
      setLogsStatus({
        error: true,
        msg: "As senhas não estão iguais."
      })
    else {
      if (registerData.user.length !== 0 && registerData.email.length !== 0 && registerData.password.length !== 0 && registerData.passwordAgain.length !== 0) {
        setLogsStatus({
          success: true,
          msg: "Tudo pronto"
        })
      } else {
        setLogsStatus({
          error: true,
          msg: ""
        })
      }
    }
  }, [registerData])


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
        <section className="small-form-section">
          <div>
            <div className="input-container">
              <i className="far fa-user"></i>
              <input 
                className="form-beautiful" 
                type="text" 
                placeholder="nome de Usuário" 
                onChange={(data) => handleChangeForm({ user: data.target})}
                value={registerData.user}
              />
            </div>

            <div className="input-container">
              <i className="fas fa-envelope"></i>
              <input 
                className="form-beautiful" 
                type="email" 
                placeholder="Email" 
                onChange={(data) => handleChangeForm({ email: data.target })}
                value={registerData.email}
              />
            </div>

            <div className="input-container">
              <i className="fas fa-lock"></i>
              <input 
                className="form-beautiful" 
                type={ registerData.showPassword ? "text" : "password" }
                placeholder="Senha" 
                onChange={(data) => handleChangeForm({ password: data.target })}
                value={registerData.password}
              />
            </div>

            <div className="input-container">
              <i className="fas fa-lock"></i>
              <input 
                className="form-beautiful" 
                type={ registerData.showPassword ? "text" : "password" }
                placeholder="Digite a senha novamente" 
                onChange={(data) => handleChangeForm({ passwordAgain: data.target })}
                value={registerData.passwordAgain}
              />
            </div>
          </div>

          <div className="text-start"> 
            <input 
              className="ms-2 mt-2" 
              id="show-password-small-form" 
              type="checkbox" 
              checked={registerData.showPassword}
              onChange={(data) => setRegisterData({ ...registerData, showPassword: data.target.checked })}
            />
            <label htmlFor="show-password-small-form">Mostrar senha</label>
          </div>
          {
            isLoading 
            ? <img className="mt-3 mb-3" width={"15%"} src={require("../../assets/images/ballsLoading.gif")} />
            : <></>
          }
          <br />
          <button 
            className="form-btn-iceBlue btn" 
            onClick={() => { register() }}
            disabled={ logsStatus.error || isLoading ? true : false }
          >Finalizar Cadastro</button>
        </section>
        {/* <footer className="small-form-footer">
          Não tem uma conta? <Link to="/register"> Cadastre-se</Link>
        </footer> */}
      </div>
    </div>
  )

}