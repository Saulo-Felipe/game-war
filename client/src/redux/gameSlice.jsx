import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
  name: "gameState",
  initialState: {
    character: "steve",
    selectedRoom: null,
    onlinePlayers: [],
  },
  reducers: {
    changeCharacter(state, { payload }) {
      return { ...state, character: payload }
    },
    changeSelectedRoom(state, { payload }) {
      return { ...state, selectedRoom: payload }
    },
    changeOnlinePlayers(state, { payload }) {
      return { ...state, onlinePlayers: payload }
    }
  }
})


export const { changeCharacter, changeSelectedRoom, changeOnlinePlayers } = slice.actions

export const selectGameState = state => state.gameState

export default slice.reducer