import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
  name: "player",
  initialState: {
    name: null,
    email: null,
    level: null,
  },
  reducers: {
    changePlayer(state, { payload }) {
      return {
        name: payload.name,
        email: payload.email,
        level: payload.level,
      }
    }
  }
})


export const { changePlayer } = slice.actions
export const selectPlayer = state => state.player
export default slice.reducer
