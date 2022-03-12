import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
  name: "gameState",
  initialState: {
    character: "steve",
    selectedRoom: null,
  },
  reducers: {
    changeCharacter(state, { payload }) {
      return { ...state, character: payload }
    },
    changeSelectedRoom(state, { payload }) {
      return { ...state, selectedRoom: payload }
    }
  }
})


export const { changeCharacter, changeSelectedRoom } = slice.actions

export const selectGameState = state => state.gameState

export default slice.reducer