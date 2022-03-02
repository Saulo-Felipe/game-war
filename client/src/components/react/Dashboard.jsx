import { useEffect } from 'react'
import Home from './Home'
import ChooseLevel from './ChooseLevel'
import { useSelector, useDispatch } from 'react-redux'
import { changeLoading, changeScreen, selectGameState } from '../../redux/gameSlice'
import socket from '../../tools/Socket'
import { game } from '../../App'
import Game from '../../scenes/Game'


export default function Dashboard() {
  const { currentScreen, selectedRoom, character } = useSelector(selectGameState)
  const dispatch = useDispatch()
  

  useEffect(() => {
    socket.on("connect", () => {
      console.log("[new connection] id -> ", socket.id)
    })
  }, [])

  useEffect(() => {
    if (selectedRoom !== null) {

      socket.emit("new-player", { room: selectedRoom, character }, null, (response) => {
        // Response me dará o estado atual do game

        dispatch(changeLoading(false))
        dispatch(changeScreen("play-game"))

        game.scene.add("Game", Game) 
        game.scene.start("Game", { 
          character,
          selectedRoom,
        })


      })

    }
  }, [selectedRoom])

  if (currentScreen === "home") 
    return <Home />
  else if (currentScreen === "select-room")
    return <ChooseLevel />
  else if (currentScreen === "play-game")
    return <></>
  else return <></>
}