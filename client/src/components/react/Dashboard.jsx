import { useState } from 'react'
import Home from './Home'
import ChooseLevel from './ChooseLevel'

export default function Dashboard() {
  const [currentScreen, setCurrentScreen] = useState("home")
  const [sceneInformation, setSceneInformation] = useState({
    character: "steve",
  })


  return (
    <>{
      currentScreen === "home" 
      ? <Home screenState={{ setCurrentScreen, sceneInformation, setSceneInformation }} />
      : <ChooseLevel screenState={{ setCurrentScreen, sceneInformation, setSceneInformation }} />
    }</>
  )
}