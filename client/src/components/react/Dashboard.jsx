import { useState, useEffect } from 'react'
import Home from './Home'
import ChooseLevel from './ChooseLevel'
import { useSelector } from 'react-redux'
import { selectGameState } from '../../redux/gameSlice'

export default function Dashboard() {
  const { currentScreen } = useSelector(selectGameState)
  console.log("teste de tela: ", currentScreen)

  if (currentScreen === "home") 
    return <Home />
  else if (currentScreen === "select-room")
    return <ChooseLevel />
  else if (currentScreen === "play-game")
    return <></>
  else return <></>
}