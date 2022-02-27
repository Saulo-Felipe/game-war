import { useState } from 'react'
import '../../styles/dashboard.css'
import { game } from '../../App'
import Game from '../../scenes/Game'

export default function Home({ screenState }) {
  const [translateCarousel, setTranslateCarousel] = useState(0)
  const [allCharacter, setAllCharacter] = useState([
    {
      url: require(`../../assets/dashboard/ninja-animation.gif`),
      name: "ninja",
      indexLimit: 9,
      first: true
    },
    {
      url: require(`../../assets/dashboard/steve-animation.gif`),
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
    
  function startGame() {
    screenState.setCurrentScreen("choose-level")
    // game.scene.add("Game", Game)
    // game.scene.start("Game")
  }


  return (
    <div id="dashboard">
      <header className="header-dashboard">
  
      </header>

      <section className="section-dashboard">
        <div className="section-one sub-section-container">
          <div className="fs-3 text-light" onClick={
            () => {
              console.log("Posição: ", translateCarousel)
              console.log("Selected: ", allCharacter[translateCarousel > -1 ? translateCarousel : translateCarousel*-1 ])          
            }
          }>NOME DO JOGO</div>

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
              allCharacter.map((item, index) =>
                <div 
                  key={index} 
                  className="select-img-container" 
                  style={{
                    transform: `translateX(${100*translateCarousel}%)`,
                    backgroundImage: `url(${item.url})`
                  }}
                >
                </div>
              )
            }
           
          </div>

          <div className="carousel-controls-container">
            <span className="back-person arrow-control" onClick={() => backCharacter()}><i className="fas fa-angle-left"></i></span>
            <span className="next-person arrow-control" onClick={() => nextCharacter()}><i className="fas fa-angle-right"></i></span>
          </div>
        </div>

        <div className="section-three sub-section-container">
          <div 
            id="btn-play" 
            style={{ backgroundImage: `url(${require("../../assets/dashboard/btn-play.png")})`}}
            onClick={() => startGame()}
          ></div>
        </div>
      </section>

      <footer></footer>
    </div>    
  )
}