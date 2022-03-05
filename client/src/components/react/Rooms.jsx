import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectGameState, changeScreen, changeSelectedRoom } from '../../redux/gameSlice'
import socket from '../../services/Socket'
import { game } from '../../App'
import HalloweenMap from '../../scenes/HalloweenMap'

import '../../styles/chooseLevel.css'

export default function ChooseLevel() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { character } = useSelector(selectGameState)

  function startGame(room) {
    setLoading(true)
  }

  return (
    <div id="choose-level-container">
      {
        loading 
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
        <Link to={"/home"} className="no-href">
          <button className="btn-back-home" >
            <i className="fas fa-chevron-left"></i>
          </button>
        </Link>
      </footer>
    </div>
  )
}