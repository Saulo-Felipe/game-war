import io from 'socket.io-client'

const ENDPOINT = "https://8081-saulofelipe-gamewar-3cgum9w3a43.ws-us38.gitpod.io"

// const socket = io(ENDPOINT)
const socketOnlinePlayers = io(`${ENDPOINT}/online-players`)
const halloweenRoom = io(`${ENDPOINT}/halloweenRoom`)

export { 
  socketOnlinePlayers,
  // socket,
  halloweenRoom
}