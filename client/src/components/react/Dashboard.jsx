import { useEffect } from 'react'
import Home from './Home'
import ChooseLevel from './ChooseLevel'
import { useSelector, useDispatch } from 'react-redux'
import { changeLoading, changeScreen, selectGameState } from '../../redux/gameSlice'
import socket from '../../tools/Socket'
import { game } from '../../App'
import Halloween from '../../scenes/HalloweenMap'


export default function Dashboard() {
  const { currentScreen, selectedRoom, character } = useSelector(selectGameState)
  const dispatch = useDispatch()
  

  useEffect(() => {
    socket.on("connect", () => {
      console.log("[new connection] id -> ", socket.id)
      console.log("dados: ", socket)
      console.log("persistente: ", socket.userID)
    })
  }, [])

  useEffect(() => {
    if (selectedRoom !== null) {

      socket.emit("new-player", { room: selectedRoom, character }, null, (response) => {
        // Response me dará o estado atual do game

        dispatch(changeLoading(false))
        dispatch(changeScreen("play-game"))

        if (selectedRoom === "halloween") {
          game.scene.add("Game-Halloween", Halloween) 
          game.scene.start("Game-Halloween", { 
            dispatch,
            changeLoading,
            character,
          })  
        }

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