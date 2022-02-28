import { useState } from 'react'
import { game } from '../../App'
import Game from '../../scenes/Game'
import '../../styles/chooseLevel.css'

export default function ChooseLevel({ screenState }) {
  const [isGo, setIsGo] = useState(true)

  function startGame() {
    game.scene.add("Game", Game)
    game.scene.start("Game", {
      character: screenState.sceneInformation.character
    })
    setIsGo(false)
  }

  return (
    <>
      {
        isGo ? 
        <div id="choose-level-container">
        <header>
          <h1 className="fs-1 fw-light text-light">Salas disponíveis</h1>
        </header>
  
        <section className="levels-container">
          <div id="halloween-card" className="chooseLevel-card">
            <div className="card-bg-blur">
              
            </div>
            <div className="card-play">
              PLAY
            </div>
          </div>
  
          <div className="chooseLevel-card" onClick={() => startGame()}>
            <div className="card-bg-blur">
              
            </div>
            <div className="card-play">
              PLAY
            </div>
          </div>
        </section>
  
        <footer className="choose-level-footer">
          <button className="btn-back-home" onClick={() => screenState.setCurrentScreen("home")}>
          <i class="fas fa-chevron-left"></i>
          </button>
        </footer>
      </div>
      : <></>
      }
    </>

  )
}