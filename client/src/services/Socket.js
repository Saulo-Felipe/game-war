import io from 'socket.io-client'

const ENDPOINT = "https://8081-saulofelipe-gamewar-t1xjx75yjq2.ws-us34.gitpod.io"

// const socket = io(ENDPOINT)
const socketOnlinePlayers = io(`${ENDPOINT}/online-players`)
const halloweenRoom = io(`${ENDPOINT}/halloweenRoom`)

export { 
  socketOnlinePlayers,
  // socket,
  halloweenRoom
}