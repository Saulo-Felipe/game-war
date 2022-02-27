import Phaser from 'phaser'
import Dashboard from './components/react/Dashboard'

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
  return <Dashboard />
}

export default App;
