import axios from 'axios'

const api = axios.create({
  baseURL: "https://8081-saulofelipe-gamewar-3cgum9w3a43.ws-us38.gitpod.io/",
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