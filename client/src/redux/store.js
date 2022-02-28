import { configureStore } from "@reduxjs/toolkit"
import gameState from './gameSlice'


export default configureStore({
  reducer: {
    gameState: gameState
  }
})