import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
  name: "gameState",
  initialState: {
    character: "steve",
    currentScreen: "home"
  },
  reducers: {
    changeCharacter(state, { payload }) {
      return { ...state, character: payload }
    },
    changeScreen(state, { payload }) {
      return { ...state, currentScreen: payload }
    }
  }
})


export const { changeCharacter, changeScreen } = slice.actions

export const selectGameState = state => state.gameState

export default slice.reducer