import Phaser from 'phaser'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import RequireAuth from './services/PrivateRoutes'
import { socketOnlinePlayers } from './services/Socket'
import { useSelector, useDispatch } from 'react-redux'
import { changeOnlinePlayers, selectGameState } from './redux/gameSlice'

import Home from './components/react/Home'
import Rooms from './components/react/Rooms'
import Login from './components/react/Login'
import PlayGame from './components/react/PlayGame'
import Register from './components/react/Register'


export const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth*2, // 6000
  height: window.innerHeight*2, // 1800
  // scene: [Home, Game],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1700, x: 0 },
      debug: true,
      tileBias: 120,
    }
  }
})

function App() {
  // const { onlinePlayers } = useSelector(selectGameState)
  const { onlinePlayers } = useSelector(selectGameState)
  const dispatch = useDispatch()

  useEffect(() => {
    const location = window.location.pathname


    if (location === "/home" || location === "/rooms" || location === "/play-game") {

      socketOnlinePlayers.on("connect", () => {
        console.log("[online-players] -> Successfully Connected")
  
        socketOnlinePlayers.emit("new player", localStorage.getItem("token_login"))
      })
  
      socketOnlinePlayers.on("new player", (player) => {
        console.log("[new player] ", player)

        console.log("antes de alterar: ", onlinePlayers)
        dispatch(changeOnlinePlayers({ action: "new-player", player }))

        // dispatch(changeOnlinePlayers({[...onlinePlayers, player]}))
      })
      
      socketOnlinePlayers.on("delete player", playerID => {
        console.log("[delete player] ", playerID)
        
        dispatch(changeOnlinePlayers({ action: "delete-player", id: playerID }))

      })
  
      socketOnlinePlayers.emit("get players", null, (response) => {
        console.log("[initial state] ", response)

        dispatch(changeOnlinePlayers({ action: "initial-state", response }))
      })
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/home" />} />
        <Route path="/home" element={<RequireAuth> <Home /> </RequireAuth>}/>
        <Route path="/rooms" element={<RequireAuth> <Rooms /> </RequireAuth>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/play-game" element={<RequireAuth> <PlayGame /> </RequireAuth> } />
      </Routes>
    </BrowserRouter>  
  )
}

export default App;
