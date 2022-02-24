import { useState } from 'react'
import Phaser from 'phaser'
import Game from './scenes/Game'
import Home from './scenes/Home'
import './styles/dashboard.css'

export const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth*2, // 6000
  height: window.innerHeight*2, // 1800
  scene: [Home, Game],
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
  const [translateCarousel, setTranslateCarousel] = useState(0)
  const [allCharacter, setAllCharacter] = useState([
    { 
      element: <img src={require('./assets/dashboard/ninja/ninja0.png')} id="ninja" /> ,
      name: "ninja", 
      indexLimit: 9, 
      first: true
    },
    {
      element: <img src={require("./assets/dashboard/steve/steve0.png")} id="steve" />,
      name: "steve", 
      indexLimit: 9, 
      last: true
    }
  ])


  function nextCharacter() {
    if (!(allCharacter[translateCarousel*-1].last))
      setTranslateCarousel(translateCarousel-1)
  }

  function backCharacter() {
    if (allCharacter[translateCarousel+1].first)
      setTranslateCarousel(translateCarousel+1)

  }
  
  
  return (
    <div id="dashboard">
      <header className="header-dashboard">
  
      </header>

      <section className="section-dashboard">
        <div className="section-one sub-section-container">
          <div className="fs-3 text-light">NOME DO JOGO</div>

          <div className="search-player mt-3">
            <div className="text-light">Faça amigos <i className="fas fa-user-friends"></i></div>

            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Nome de usuário ou ID" aria-label="Username" aria-describedby="basic-addon1" />
              <span className="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></span>
            </div>

            <hr />

            <div className="text-light">Seus Amigos</div>

            <div className="friends-container">
              <div className="friend">
                <div className="online-icon"></div>
                <div>Cachorro caramelo</div>
              </div>

              <div className="friend">
                <div className="offline-icon"></div>
                <div>Katarine M'smeils</div>
              </div>
            </div>

          </div>
        </div>

        <div className="section-two sub-section-container">
          <div className="carousel-container">

            {
              allCharacter.map(item =>
                <div className="select-img-container" style={{transform: `translateX(${100*translateCarousel}%)`}}> 
                  { item.element }
                </div>
              )
            }
           
          </div>

          <button className="btn btn-success play form-control">Iniciar</button>

          <div className="carousel-controls-container">
            <span className="back-person arrow-control" onClick={() => backCharacter()}><i className="fas fa-angle-left"></i></span>
            <span className="next-person arrow-control" onClick={() => nextCharacter()}><i className="fas fa-angle-right"></i></span>
          </div>
        </div>

        <div className="section-three sub-section-container">pagina três</div>
      </section>

      <footer></footer>
    </div>    
  )
}

export default App;
