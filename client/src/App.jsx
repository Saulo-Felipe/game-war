import Phaser from 'phaser'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import RequireAuth from './tools/PrivateRoutes'

import Dashboard from './components/react/Dashboard'
import Rooms from './components/react/ChooseLevel'
import Login from './components/react/Login'

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
        <Route path="/home" element={<RequireAuth> <Dashboard /> </RequireAuth>}/>
        <Route path="/rooms" element={<RequireAuth> <Rooms /> </RequireAuth>}/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>  
  )
}

export default App;
