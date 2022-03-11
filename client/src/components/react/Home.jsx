import { useState, useEffect } from 'react'
import '../../styles/dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { changeCharacter } from '../../redux/gameSlice'
import { Link } from 'react-router-dom'
import { changePlayer, selectPlayer } from '../../redux/playerSlice'
import api from '../../services/api'
import errorValidation from '../../services/errorValidation'
import socket from '../../services/Socket'


export default function Home() {
  const dispatch = useDispatch()
  const [translateCarousel, setTranslateCarousel] = useState(0)
  const [allCharacter, setAllCharacter] = useState([
    {
      url: require(`../../assets/dashboard/steve-animation.gif`),
      name: "steve", 
      first: true
    },
    {
      url: require(`../../assets/dashboard/ghostGun-animation.gif`),
      name: "ghostGun",
      last: true
    }
  ])
  const [globalOnlinePlayers, setGlobalOnlinePlayers] = useState([])

  const userState = useSelector(selectPlayer)


  function carouselNext() {
    if (!(allCharacter[translateCarousel*-1].last)) {
      setTranslateCarousel(translateCarousel-1)
    }
  }

  function carouselBack() {
    if (allCharacter[translateCarousel+1].first) {
      setTranslateCarousel(translateCarousel+1)
    }
  }
    
  function goToLevels() {
    var selectedCharacter = allCharacter[translateCarousel < 0 ? translateCarousel*-1 : translateCarousel].name

    dispatch(changeCharacter(selectedCharacter))
  }

  useEffect(() => {
    (async() => {
      const { data } = await api.post("/game/get-player", { token: localStorage.getItem("token_login") })

      if (!errorValidation(data)) return false
      
      dispatch(changePlayer({
        ...data.user
      }))

    })();

  // ------------- Sockets --------------------

  socket.on("connect", (data) => {
    console.log("conectado: ", data)

    socket.emit("new-player-online", localStorage.getItem("token_login"), (response) => {
      if (response === false) {
        alert("Você ja está jogando em outro dispositivo")
      } else {
        setGlobalOnlinePlayers(response)
      }
    })

    socket.on("disconnect", () => {
      setGlobalOnlinePlayers(globalOnlinePlayers.filter(player => player.id !== socket.id))
    })

  })

  socket.on("new-player-online", (newPlayer) => {
    console.log("novo player: ", newPlayer)
    setGlobalOnlinePlayers([...globalOnlinePlayers, newPlayer])
  })

  }, [])



  return (
    <div id="dashboard">
      <header className="header-dashboard">
  
      </header>

      <section className="section-dashboard">
        <div className="section-one sub-section-container">
          <div className="w-100">
            <div className="fs-3 text-light" onClick={
              () => {
                console.log("Posição: ", translateCarousel)
                console.log("Selected: ", allCharacter[translateCarousel > -1 ? translateCarousel : translateCarousel*-1 ])          
              }
            }>NOME DO JOGO</div>

            <div className="card-dashboard mt-3">
              <div className="text-light">Faça amigos <i className="fas fa-user-friends"></i></div>

              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Nome de usuário ou ID" aria-label="Username" aria-describedby="basic-addon1" />
                <span className="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></span>
              </div>

              <hr style={{ opacity: 1 }}/>
              <div className="text-white">Jogadores online neste momento</div>

              <div>
                {
                  globalOnlinePlayers.map(item => 
                    <div className="available-player">
                      <div className="online-icon"></div>
                      <div>{ item.name }</div>
                    </div>    
                  )
                }
              </div>

              <div className="text-light">Meus Amigos</div>

              <div className="friends-container">
                <div className="available-player">
                  <div className="online-icon"></div>
                  <div>Cachorro caramelo</div>
                </div>

                <div className="available-player">
                  <div className="offline-icon"></div>
                  <div>Katarine M'smeils</div>
                </div>
              </div>
            </div>         
          </div>
            <div className="big-btn-store big-btn">
              LOJA <i className="ms-3 fa-solid fa-boxes-stacked"></i>
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
            <span className="back-person arrow-control" onClick={() => carouselBack()}><i className="fas fa-angle-left"></i></span>
            <span className="next-person arrow-control" onClick={() => carouselNext()}><i className="fas fa-angle-right"></i></span>
          </div>
        </div>

        <div className="section-three sub-section-container">
          <div className="w-100">
            <div className="mb-2">
              <div className="player-name">{userState.name}</div>

              <div></div>
            </div>
                      
            <div className="card-dashboard mb-2 p-0">

              <div className="card-line" style={{ color: "gold"}}>
                <div className="card-line-icon"><i className="fas fa-award"></i></div>
                <div className="part-card-1 part-card">Nível: </div>
                <div className="part-card-2 part-card">{userState.level}</div>
              </div>

              <div className="card-line" style={{ color: "#fe6262"}}>
                <div className="card-line-icon"><i className="fas fa-skull-crossbones"></i></div>
                <div className="part-card-1 part-card">Abatidos: </div>
                <div className="part-card-2 part-card">1990</div>
              </div>           

              <div className="card-line" style={{ color: "lightskyblue"}}>
                <div className="card-line-icon"><i className="fas fa-trophy"></i> </div>
                <div className="part-card-1 part-card">Vitórias: </div>
                <div className="part-card-2 part-card">15</div>
              </div>

              <div className="card-line" style={{ color: "#ffee91"}}>
                <div className="card-line-icon"><i className="fas fa-meh"></i></div>
                <div className="part-card-1 part-card">Derrotas: </div>
                <div className="part-card-2 part-card">12</div>
              </div>


              {/* <i className="fas fa-cog"></i>
              <i className="fas fa-volume"></i> */}
            </div>
          </div>

          <Link to={"/rooms"} className="w-100 no-href">
            <div 
              id="btn-play"
              className="big-btn-play big-btn"
              // style={{ backgroundImage: `url(${require("../../assets/dashboard/btn-play.png")})`}}
              onClick={() => goToLevels()}
            >JOGAR <i className="ms-3 fas fa-gamepad"></i></div>
          </Link>
        </div>
      </section>

      <footer></footer>
    </div>    
  )
}