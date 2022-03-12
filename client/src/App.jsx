import Phaser from 'phaser'
import { BrowserRouter, Route, Routes, Navigate  } from 'react-router-dom'
import RequireAuth from './services/PrivateRoutes'

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
