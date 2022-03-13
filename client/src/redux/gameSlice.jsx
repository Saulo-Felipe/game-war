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
      if (payload.action === "new-player") {
        return { ...state, onlinePlayers: [...state.onlinePlayers, payload.player]}

      } else if (payload.action === "delete-player") {
        return { ...state, onlinePlayers: state.onlinePlayers.filter(player => player.userID !== payload.id) }

      } else if (payload.action === "initial-state") {
        return { ...state, onlinePlayers: payload.response }
      }
    }
  }
})


export const { changeCharacter, changeSelectedRoom, changeOnlinePlayers } = slice.actions

export const selectGameState = state => state.gameState

export default slice.reducer