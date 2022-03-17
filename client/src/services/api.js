import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:8081/",
  withCredentials: true
})


api.defaults.headers.common['authorization'] = localStorage.getItem('token_login')

api.interceptors.response.use((response) => {
  if (response.data.token_isValid === false) {
    alert("Deslogado")
    localStorage.removeItem('token_login')
    return window.location.href = "/login"
  }

  return response
})

export default api