import { useDispatch, useSelector } from 'react-redux'
import { selectGameState, changeLoading, changeScreen, changeSelectedRoom } from '../../redux/gameSlice'

import '../../styles/chooseLevel.css'

export default function ChooseLevel() {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(selectGameState)

  function startGame(room) {
    dispatch(changeSelectedRoom(room))
    dispatch(changeLoading(true))
  }
  
  function backToHome() {
    dispatch(changeScreen("home"))
  }

  return (
    <div id="choose-level-container">
      {
        isLoading 
        ? <div className="loading-screen">
          <img 
            src={require("../../assets/dashboard/loading.gif")}
            width="90px"
          />
        </div>
        : <></>
      }
      <header>
        <h1 className="fs-1 fw-light text-light">Salas disponíveis</h1>
      </header>

      <section className="levels-container">
        <div id="halloween-card" className="chooseLevel-card" onClick={() => startGame("halloween")}>
          <div className="card-bg-blur">
            
          </div>
          <div className="card-play">
            PLAY
          </div>
        </div>

        <div className="chooseLevel-card" onClick={() => startGame("ice-map")}>
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