import { configureStore } from "@reduxjs/toolkit"
import gameState from './gameSlice'
import player from "./playerSlice"


export default configureStore({
  reducer: {
    gameState: gameState,
    player: player
  }
})