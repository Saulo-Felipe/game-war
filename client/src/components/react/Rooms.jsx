import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectGameState } from '../../redux/gameSlice'
import { halloweenRoom } from '../../services/Socket'
import { game } from '../../App'
import HalloweenMap from '../../scenes/halloween/map'

import '../../styles/chooseLevel.css'

export default function ChooseLevel() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { character } = useSelector(selectGameState)
  const navigate = useNavigate()

  function startGame(room) {
    // setLoading(true)
    if (room === "halloween") {
      game.scene.add('Game-Halloween', HalloweenMap)
      game.scene.start("Game-Halloween", {
        character,
        dispatch,
      })
      navigate("/play-game")

    } else if (room === "ice-map") {
      alert("Ainda não disponível")
    }
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