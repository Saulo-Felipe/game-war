import { useDispatch } from 'react-redux'
import { game } from '../../App'
import { changeScreen } from '../../redux/gameSlice'
import Game from '../../scenes/Game'
import '../../styles/chooseLevel.css'

export default function ChooseLevel() {

  /* -----------  Passar parametros para scene do game ------------- */
  const dispatch = useDispatch()

  function startGame() {
    game.scene.add("Game", Game)
    game.scene.start("Game", {
      character: "steve"
    })
    dispatch(changeScreen("play-game"))
  }

  function backToHome() {
    dispatch(changeScreen("home"))
  }

  return (
    <div id="choose-level-container">
      <header>
        <h1 className="fs-1 fw-light text-light">Salas disponíveis</h1>
      </header>

      <section className="levels-container">
        <div id="halloween-card" className="chooseLevel-card" onClick={() => startGame()}>
          <div className="card-bg-blur">
            
          </div>
          <div className="card-play">
            PLAY
          </div>
        </div>

        <div className="chooseLevel-card">
          <div className="card-bg-blur">
            
          </div>
          <div className="card-play">
            PLAY
          </div>
        </div>
      </section>

      <footer className="choose-level-footer">
        <button className="btn-back-home" onClick={() => backToHome()}>
          <i className="fas fa-chevron-left"></i>
        </button>
      </footer>
    </div>
  )
}