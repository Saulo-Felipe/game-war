import axios from 'axios'


const api = axios.create({
  baseURL: "https://8081-saulofelipe-gamewar-t1xjx75yjq2.ws-us34.gitpod.io/",
  withCredentials: true
})


export default api