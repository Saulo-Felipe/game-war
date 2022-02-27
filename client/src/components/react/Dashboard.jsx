import { useState } from 'react'
import Home from './Home'
import ChooseLevel from './ChooseLevel'

export default function Dashboard() {
  const [currentScreen, setCurrentScreen] = useState("home")


  return (
    <>{
      currentScreen === "home" 
      ? <ChooseLevel screenState={{ currentScreen, setCurrentScreen }} />
      : <Home screenState={{ currentScreen, setCurrentScreen }} />
    }</>
  )
}