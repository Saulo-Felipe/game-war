import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
  name: "Player",
  initialState: {
    playerID: null,
  },
  reducers: {
    changePlayer(state, { payload }) {
      return { 
        playerID: payload.playerID
      }
    }
  }
})


export const { changePlayer } = slice.actions
export const selectPlayer = state => state.Player
export default slice.reducer
