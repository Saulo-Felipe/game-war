import io from 'socket.io-client'

const ENDPOINT = "https://8081-saulofelipe-gamewar-t1xjx75yjq2.ws-us34.gitpod.io"


export default io(ENDPOINT)