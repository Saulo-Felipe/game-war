import { Route, Navigate } from 'react-router-dom'


function verifyAuth() {
  const token = localStorage.getItem("token_login")

  return token ? true : false
}

export default function RequireAuth({ children }) {
  let isAuth = verifyAuth()

  if (!isAuth) {
    return <Navigate to="/login" />
  }

  return children
}