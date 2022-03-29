import io from 'socket.io-client'

const ENDPOINT = "http://localhost:8081"

// const socket = io(ENDPOINT)
const socketOnlinePlayers = io(`${ENDPOINT}/online-players`)
const halloweenRoom = io(`${ENDPOINT}/halloweenRoom`)

export { 
  socketOnlinePlayers,
  // socket,
  halloweenRoom
}