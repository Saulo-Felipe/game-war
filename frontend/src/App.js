import Phaser from "phaser"
import Game from "./scenes/Game"
import Home from './scenes/Home'
import './styles/dashboard.css'


function App() {

  new Phaser.Game({
    type: Phaser.AUTO,
    width: window.innerWidth*2, // 6000
    height: window.innerHeight*2, // 1800
    scene: [Home, Game],
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 1700, x: 0 },
        // debug: true,
        tileBias: 120,
      }
    }
  })
  
  
  return (
    <div id="dashboard">
      <header class="header-dashboard">
  
      </header>

      <section class="section-dashboard">
        <div class="section-one sub-section-container">
          <div class="fs-3 text-light">NOME DO JOGO</div>

          <div class="search-player mt-3">
            <div class="text-light">Faça amigos <i class="fas fa-user-friends"></i></div>

            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Nome de usuário ou ID" aria-label="Username" aria-describedby="basic-addon1" />
              <span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
            </div>

            <hr />

            <div class="text-light">Seus Amigos</div>

            <div class="friends-container">
              <div class="friend">
                <div class="online-icon"></div>
                <div>Cachorro caramelo</div>
              </div>

              <div class="friend">
                <div class="offline-icon"></div>
                <div>Katarine M´smeils</div>
              </div>
            </div>

          </div>
        </div>

        <div class="section-two sub-section-container">
          <div class="carousel-container">

            <div class="select-img-container">
              <img src="assets/dashboard/ninja/ninja0.png" id="ninja" />
            </div>

            <div class="select-img-container">
              <img src="assets/dashboard/steve/Idle (3).png" id="steve" />
            </div>
            
          </div>

          <button class="btn btn-success play form-control">Iniciar</button>

          <div class="carousel-controls-container">
            <span class="back-person arrow-control"><i class="fas fa-angle-left"></i></span>
            <span class="next-person arrow-control"><i class="fas fa-angle-right"></i></span>
          </div>
        </div>

        <div class="section-three sub-section-container">pagina três</div>
      </section>

      <footer></footer>
    </div>    
  )
}

export default App;
