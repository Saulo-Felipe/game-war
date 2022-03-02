import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
  name: "gameState",
  initialState: {
    character: "steve",
    currentScreen: "home",
    selectedRoom: null,
    isLoading: false,
  },
  reducers: {
    changeCharacter(state, { payload }) {
      return { ...state, character: payload }
    },
    changeScreen(state, { payload }) {
      return { ...state, currentScreen: payload }
    },
    changeSelectedRoom(state, { payload }) {
      return { ...state, selectedRoom: payload }
    },
    changeLoading(state, { payload }) {
      return { ...state, isLoading: payload }
    }
  }
})


export const { changeCharacter, changeScreen, changeSelectedRoom, changeLoading } = slice.actions

export const selectGameState = state => state.gameState

export default slice.reducer