import io from 'socket.io-client'

const ENDPOINT = "https://8081-saulofelipe-gamewar-8u76ax1ddpc.ws-us34.gitpod.io"


export default io(ENDPOINT)